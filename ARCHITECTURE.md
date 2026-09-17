# Decisões de Arquitetura — WhaiData API

Este documento existe pra registrar o **porquê** de decisões que não são óbvias só lendo o código. Não é uma spec completa da API (isso é o Swagger, em `/api-docs`) — é o histórico de raciocínio por trás de escolhas que, sem contexto, pareceriam arbitrárias ou até erradas.

Atualize este arquivo quando tomar uma decisão de arquitetura não-trivial. Não precisa documentar o óbvio.

## Stack

- Node + Express + TypeScript
- TypeORM + PostgreSQL, schema gerenciado só por migration (`synchronize: false` em [data-source.ts](src/db/config/data-source.ts)) — nunca alterar tabela via sync automático, só via `npm run migration:generate`/`migration:create`.
- Validação de entrada com Zod, um validator por domínio em `services/validators/`.

## Camadas: Route → Controller → Service → Repository

- **Controller**: só HTTP. Lê `req`, chama o service, decide o status code e o shape do JSON de resposta. Não fala com repository nem com banco.
- **Service**: regra de negócio. É a camada que decide "pode ou não pode", "o que acontece quando X".
- **Repository**: acesso a dado puro, sem regra de negócio.

**Regra combinada**: um Service pode chamar um Repository de outro domínio diretamente (pulando o Service daquele domínio) quando a operação não carrega nenhuma regra de negócio própria — só leitura ou escrita direta, sem validação condicional. Exemplos atuais:
- [`UsersService.register`](src/services/users-service.ts) cria as preferências default (sistema e pagamento) chamando `UserSystemPreferencesRepository`/`UserPaymentPreferencesRepository` direto — são valores fixos, sem decisão de negócio no momento da criação.
- [`UsersService.getLoggedUser`](src/services/users-service.ts) lê essas mesmas preferências direto do repository — leitura pura, sem regra pra aplicar ainda.

Se um dia existir regra de negócio nessas operações (exemplo puramente hipotético discutido: "usuário do cargo X só pode ativar métodos de pagamento Y"), esses pontos precisam passar a chamar um Service de preferências em vez do Repository direto — hoje esse Service seria só um repasse vazio, por isso não existe (`UserPaymentPreferencesService` não existe ainda; `UserSystemPreferencesService` existe só porque `updatePreference` já tem regra real).

## Autenticação (JWT)

- O token ([jwt.ts](src/utils/jwt.ts)) carrega só `{ userId }`, expira em 1h. **De propósito**: o payload de um JWT é imutável entre login e expiração — se preferências do usuário fossem embutidas ali, mudar uma preferência exigiria deslogar/logar de novo pra refletir. Por isso preferências nunca vão para dentro do token.
- [`authMiddleware`](src/http/middlewares/auth-middleware.ts) decodifica o JWT e depois **busca o usuário no banco a cada request** (não confia só no payload do token). Isso já custa uma query por request autenticado.
- `POST /users/login` e `GET /users/me` devolvem o mesmo formato agregado (`user` + `systemPreferences` + `paymentPreferences`) — decisão: o front recebe tudo no login, sem precisar de uma segunda chamada imediata; `/me` existe pra revalidar depois.

## Senha

- `password` na entity `Users` é `select: false` ([users.ts](src/db/models/users.ts)) — nenhuma query traz o hash por padrão. Só [`UsersRepository.loadByEmail`](src/db/repository/users-repository.ts) pede explicitamente via `addSelect`, porque é o único lugar que precisa comparar a senha (login).
- Isso foi corrigido depois de um vazamento real: `UserSystemPreferencesRepository.loadByUserId` carregava a relation `user` inteira (incluindo hash) sem essa proteção. A relation foi removida por ser desnecessária ali (o `user` já vem de outra fonte na mesma chamada).

## DTOs: pasta `db/DTO`

A pasta mistura dois conceitos que merecem atenção na hora de adicionar algo novo:
- `Create*Dto` (`CreateUsersDto`, `CreateUserSystemPreferences`, etc.) — payload de **entrada** pra criação.
- DTOs de **saída/resposta** (`UserPaymentMethodsDto`, `UserSystemPreferences`) — moldam o que a API devolve, e são preenchidos com `.map()` manual a partir da entity, não retornados direto. Isso é proposital: o retorno bruto do TypeORM sempre traz mais campos do que o tipo promete (`id`, `userId`, timestamps, relations inteiras) — a tipagem do TS não filtra nada em runtime, então sem esse mapeamento explícito o shape real da resposta não bate com o documentado.

## Preferências do usuário

- Ao registrar (`UsersService.register`), todo usuário novo ganha automaticamente: `UserSystemPreferences` com defaults (`dark`, `portuguese`, `brl`) e uma `UserPaymentPreferences` **para cada** `PaymentMethods` existente na tabela, todas com `isActive: true`. Ou seja, a lista de formas de pagamento disponíveis é global (cadastrada à parte, `payment_methods`), e cada usuário tem uma preferência própria por método.
- `theme`, `language` e `currency` são enums numéricos (`ThemeEnum`, `LanguagesEnum`, `CurrencyEnum` em `db/enum/`) — o JSON expõe o número, não o nome (`0`, não `"dark"`). O Swagger documenta o mapeamento número→significado.
- Há um TODO em [currency-enum.ts](src/db/enum/currency-enum.ts) sobre uma feature futura de detectar moeda/localização automaticamente via IA — ainda não implementada.

## Validação (Zod) e normalização de dados

- `name` de usuário e de cartão são normalizados (`trim().toLowerCase()`) antes de salvar ou comparar — evita duplicata por diferença de caixa/espaço (ver `Unique(["userId", "name", "lastFourDigits"])` em [cards.ts](src/db/models/cards.ts)).
- `cardFlag` aceita tanto nome (`visa`) quanto código numérico (`1`) no input — flexibilidade deliberada de input, sempre normalizado pro enum internamente ([card-validator.ts](src/services/validators/card-validator.ts)).
- `limit` do cartão aceita formato BR (`8.000,00`) e US (`8,000.00`) e desambigua pela posição do último separador — mesma ideia, tolerância de input.
- `expiresIn` do cartão rejeita datas já vencidas (antes do mês atual).

## Tratamento de erros

- `GenericError` é o erro de regra de negócio genérico (sem código, só mensagem); `UnauthorizedError` é específico de auth.
- Convenção nos controllers de **cards** e **payment-methods**: `ZodError` → 400, `GenericError` → 409, qualquer outra coisa → 500.
- **Inconsistência encontrada, não corrigida ainda**: `UsersController.register` não tem o branch de `GenericError` → 409 que os outros controllers têm. Hoje, "email already exists" (que é um `GenericError`) cai no `else` genérico e vira 500 em vez de 409/400. Ver pergunta em aberto abaixo.

---

## Perguntas em aberto (pra você responder, não assumi nada aqui)

1. **`UsersController.register` não mapeia `GenericError` pra 409** como os outros controllers fazem — isso foi esquecido ou é proposital (login/registro deveria sempre devolver 500 em erro de negócio)?
2. **`authMiddleware` busca o usuário completo no banco a cada request autenticado**, em vez de confiar só no `userId` do JWT decodificado. Isso é intencional (ex: permitir bloquear/deletar usuário e invalidar acesso na hora, sem esperar o token expirar), ou só não foi otimizado ainda?
3. **`PaymentMethodsService.getUserPreferences`** (rota `GET /payment-method/list`) devolve o array de preferências direto do repository, com a entity completa (`paymentMethod` aninhado com todos os campos) — sem o mapeamento pro DTO trimado que criamos pro login/`/me`. Isso é proposital (endpoints diferentes, contratos diferentes), ou deveria usar o mesmo `UserPaymentMethodsDto`?
