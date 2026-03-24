import {PaymentMethodsRepository} from "../db/repository/payment-methods-repository";
import {createPaymentMethodValidator} from "./validators/payment-methods-validator";
import {NormalizeCase} from "../utils/normalize-case";
import {GenericError} from "../errors";

export class PaymentMethodsService {
    private paymentMethodsRepository = new PaymentMethodsRepository();

    async create(userId: number, data: unknown) {
        const {name, color} = createPaymentMethodValidator.parse(data);
        const normalizedName = NormalizeCase(name);

        const existingPaymentMethods = await this.paymentMethodsRepository.loadAll(userId)
        const alreadyExists = existingPaymentMethods.some(item => item.name === normalizedName);
        if (alreadyExists) {
            throw new GenericError(`Already exists: ${name}`);
        }
        const validData = {
            userId,
            name: normalizedName,
            color,
        }

        return await this.paymentMethodsRepository.create(validData)
    }
}
