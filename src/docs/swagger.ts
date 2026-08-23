export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "WhaiData API",
    version: "1.0.0",
    description: "Documentação da API do WhaiData com autenticação e gerenciamento de cartões e métodos de pagamento.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local de Desenvolvimento",
    },
  ],
  // Configuração do botão "Authorize" para autenticação JWT Bearer Token
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Insira o token JWT gerado no login",
      },
    },
    schemas: {
      // ===== USUÁRIOS & AUTH =====
      UserRegisterInput: {
        type: "object",
        required: ["name", "email", "password"], // Define campos OBRIGATÓRIOS
        properties: {
          name: {
            type: "string",
            example: "João Silva",
            description: "Nome completo (mínimo de 3 caracteres)",
          },
          email: {
            type: "string",
            format: "email",
            example: "joao@email.com",
            description: "E-mail de acesso",
          },
          password: {
            type: "string",
            format: "password",
            example: "12345678",
            description: "Senha (mínimo de 8 caracteres)",
          },
        },
      },
      UserLoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "joao@email.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "12345678",
          },
        },
      },

      // ===== CARTÕES =====
      CardRegisterInput: {
        type: "object",
        required: [
          "name",
          "cardType",
          "cardFlag",
          "limit",
          "expiresIn",
          "lastFourDigits",
        ],
        properties: {
          name: {
            type: "string",
            example: "Cartão Nubank",
            description: "Apelido do cartão",
          },
          cardType: {
            type: "integer",
            enum: [1, 2, 3],
            description: "1 = Crédito, 2 = Débito, 3 = Crédito e Débito",
            example: 1,
          },
          cardFlag: {
            type: "string",
            enum: ["visa", "mastercard", "elo", "1", "2", "3"],
            description: "Bandeira do cartão (ou código numérico)",
            example: "mastercard",
          },
          limit: {
            type: "string",
            description: "Limite do cartão (mínimo 100). Aceita '5000.00' ou formato BR '5.000,00'",
            example: "5000.00",
          },
          expiresIn: {
            type: "string",
            description: "Validade no formato MM/YY",
            example: "12/28",
          },
          lastFourDigits: {
            type: "string",
            description: "4 últimos dígitos do cartão",
            example: "1234",
          },
        },
      },
      CardUpdateInput: {
        type: "object",
        required: ["id"], // Apenas o ID é obrigatório no update
        properties: {
          id: {
            type: "integer",
            description: "ID do cartão a ser atualizado (Obrigatório)",
            example: 1,
          },
          name: {
            type: "string",
            description: "Novo nome (Opcional)",
            example: "Cartão Inter",
          },
          cardType: {
            type: "integer",
            enum: [1, 2, 3],
            description: "Tipo do cartão (Opcional)",
            example: 2,
          },
          cardFlag: {
            type: "string",
            description: "Bandeira (Opcional)",
            example: "visa",
          },
          limit: {
            type: "string",
            description: "Novo limite (Opcional)",
            example: "6000.00",
          },
          expiresIn: {
            type: "string",
            description: "Nova data de expiração (Opcional)",
            example: "05/29",
          },
          lastFourDigits: {
            type: "string",
            description: "Últimos 4 dígitos (Opcional)",
            example: "5678",
          },
        },
      },
      CardDeleteInput: {
        type: "object",
        required: ["id"],
        properties: {
          id: {
            type: "integer",
            description: "ID do cartão a ser removido",
            example: 1,
          },
        },
      },
    },
  },
  // Definição de cada rota, método HTTP, parâmetros e respostas
  paths: {
    // ------------------ ROTAS DE USUÁRIOS & AUTH ------------------
    "/users/register": {
      post: {
        tags: ["Usuários"],
        summary: "Cadastrar um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserRegisterInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso",
          },
          400: {
            description: "Erro de validação nos dados enviados",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/users/login": {
      post: {
        tags: ["Autenticação"],
        summary: "Autenticar usuário e obter Token JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLoginInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Login efetuado com sucesso",
          },
          400: {
            description: "Dados de requisição inválidos",
          },
          401: {
            description: "Credenciais inválidas / Não autorizado",
          },
        },
      },
    },
    "/users/me": {
      get: {
        tags: ["Usuários"],
        summary: "Obter informações do usuário autenticado",
        security: [{ bearerAuth: [] }], // Indica que necessita de JWT
        responses: {
          200: {
            description: "Dados do usuário logado",
          },
          401: {
            description: "Token inválido ou não fornecido",
          },
        },
      },
    },

    // ------------------ ROTAS DE CARTÕES ------------------
    "/cards/register": {
      post: {
        tags: ["Cartões"],
        summary: "Cadastrar um novo cartão para o usuário logado",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CardRegisterInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Cartão registrado com sucesso",
          },
          400: {
            description: "Erro de validação nos campos do cartão",
          },
          401: {
            description: "Não autorizado",
          },
          409: {
            description: "Conflito / Cartão já existente",
          },
        },
      },
    },
    "/cards/user-cards": {
      get: {
        tags: ["Cartões"],
        summary: "Listar todos os cartões do usuário logado",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de cartões retornada com sucesso",
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
    },
    "/cards/update": {
      patch: {
        tags: ["Cartões"],
        summary: "Atualizar dados de um cartão",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CardUpdateInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Cartão atualizado com sucesso",
          },
          400: {
            description: "Erro de validação",
          },
          401: {
            description: "Não autorizado",
          },
          409: {
            description: "Erro de negócio ao atualizar cartão",
          },
        },
      },
    },
    "/cards/delete": {
      delete: {
        tags: ["Cartões"],
        summary: "Remover um cartão",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CardDeleteInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Cartão excluído com sucesso",
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
    },

    // ------------------ ROTAS DE FORMAS DE PAGAMENTO ------------------
    "/payment-method/list": {
      get: {
        tags: ["Formas de Pagamento"],
        summary: "Listar preferências de pagamento do usuário",
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: "Lista de preferências de pagamento",
          },
          401: {
            description: "Não autorizado",
          },
        },
      },
    },
    "/payment-method/{id}/update-preferences": {
      patch: {
        tags: ["Formas de Pagamento"],
        summary: "Ativar/desativar preferência de forma de pagamento",
        security: [{ bearerAuth: [] }],
        // Exemplo de parâmetro de rota (Path Parameter)
        parameters: [
          {
            name: "id",
            in: "path",
            required: true, // Indica que o parâmetro de rota é obrigatório
            description: "ID do método de pagamento",
            schema: {
              type: "integer",
              example: 1,
            },
          },
        ],
        responses: {
          200: {
            description: "Status da preferência atualizado com sucesso",
          },
          400: {
            description: "Parâmetro inválido",
          },
          401: {
            description: "Não autorizado",
          },
          409: {
            description: "Método de pagamento não encontrado",
          },
        },
      },
    },
  },
};