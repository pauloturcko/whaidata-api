import {UsersRepository} from "../db/repository/users-repository";
import {registerValidator} from "./validators/register-validator";
import {Users} from "../db/models/users";
import {GenericError} from "../errors";
import {hashPassword} from "../utils/hash-password";
import { PaymentMethodsRepository } from "../db/repository/payment-methods-repository";
import { UserPaymentPreferencesRepository } from "../db/repository/user-payment-preferences-repository";
import { UserSystemPreferencesRepository } from "../db/repository/user-system-preferences-repository";
import { ThemeEnum } from "../db/enum/theme-enum";
import { LanguagesEnum } from "../db/enum/languages-enum";
import { CurrencyEnum } from "../db/enum/currency-enum";

export class UsersService {
    private userRepository: UsersRepository;
    private paymentMethodsRepository: PaymentMethodsRepository
    private userPaymentPreferencesRepository: UserPaymentPreferencesRepository
    private userSystemPreferencesRepository: UserSystemPreferencesRepository

    constructor() {
        this.userRepository = new UsersRepository();
        this.paymentMethodsRepository = new PaymentMethodsRepository();
        this.userPaymentPreferencesRepository = new UserPaymentPreferencesRepository();
        this. userSystemPreferencesRepository = new UserSystemPreferencesRepository();
    }

    async register(data: unknown): Promise<Users> {
        const {name, password, email} = registerValidator.parse(data);

        const emailInUse = await this.userRepository.loadByEmail(email);
        if (emailInUse) {
            throw new GenericError('Email already exists');
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await this.userRepository.create({
            email,
            name,
            password: hashedPassword
        });

        const paymentMethods = await this.paymentMethodsRepository.findAll()
        await this.userPaymentPreferencesRepository.createDefaultPreferences(newUser.id, paymentMethods)
        await this.userSystemPreferencesRepository.createDefaultPreferences(newUser.id, ThemeEnum.dark, LanguagesEnum.portuguese, CurrencyEnum.brl)
        return newUser;
    }

    async getLoggedUser(userId: number): Promise<Users> {
        const user = await this.userRepository.loadById(userId);

        if (!user) {
            throw new GenericError("Unauthorized");
        }

        return user;
    }
}