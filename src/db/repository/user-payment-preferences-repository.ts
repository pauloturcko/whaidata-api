import { Repository } from "typeorm";
import { UserPaymentPreferences } from "../models/user-payment-preferences";
import { appDataSource } from "../config/data-source";
import { PaymentMethods } from "../models/payment-methods";

export class UserPaymentPreferencesRepository {
    private repository: Repository<UserPaymentPreferences>

    constructor() {
        this.repository = appDataSource.getRepository(UserPaymentPreferences)
    }

    async createDefaultPreferences(userId: number, paymentMethods: PaymentMethods[]) {
        const preferencesToSave = paymentMethods.map(method => ({
            userId,
            paymentMethodId: method.id,
            isActive: true,
        }))

        return await this.repository.save(preferencesToSave)
    }

    async loadByUserId(userId: number): Promise<UserPaymentPreferences[]> {
        return await this.repository.find({
            where: {userId},
            relations: {
                paymentMethod: true
            },
            order: {
                paymentMethodId: "ASC"
            }
        })
    }

    async findByUserAndMethod(userId: number, paymentMethodId: number) {
        return await this.repository.findOne({
            where: {userId, paymentMethodId},
            relations: {
                paymentMethod: true
            }
        })
    }

    async save(preference: UserPaymentPreferences): Promise<UserPaymentPreferences> {
        return await this.repository.save(preference)
    }
}