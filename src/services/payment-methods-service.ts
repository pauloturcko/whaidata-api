import { UserPaymentPreferencesRepository } from "../db/repository/user-payment-preferences-repository";
import { UsersRepository } from "../db/repository/users-repository";
import { GenericError } from "../errors";

export class PaymentMethodsService {
    private userPaymentPreferencesRepository: UserPaymentPreferencesRepository;
    private userRepository: UsersRepository;
    

    constructor() {
        this.userPaymentPreferencesRepository = new UserPaymentPreferencesRepository()
        this.userRepository = new UsersRepository();
        
    }

    async getUserPreferences(userId: number) {
        const user = await this.userRepository.loadById(userId);
        
        if (!user) {
            throw new GenericError("Unauthorized");
        }

        return await this.userPaymentPreferencesRepository.loadByUserId(userId)
    }

    async togglePreference(userId: number, paymentMethodId: number) {
        const preference = await this.userPaymentPreferencesRepository.findByUserAndMethod(userId, paymentMethodId)

        if(!preference) {
            throw new GenericError("Payment method not found")
        }

        preference.isActive = !preference.isActive

        return await this.userPaymentPreferencesRepository.save(preference)
    }
}
