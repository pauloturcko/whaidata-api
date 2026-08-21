import {Repository} from "typeorm";
import {PaymentMethods} from "../models/payment-methods";
import {appDataSource} from "../config/data-source";
import {CreatePaymentMethodsDto, UpdatePaymentMethodsDto} from "../DTO/payment-methods-dto";

export class PaymentMethodsRepository {
    private repository: Repository<PaymentMethods>

    constructor() {
        this.repository = appDataSource.getRepository(PaymentMethods)
    }

    async findAll(): Promise<PaymentMethods[]> {
        return await this.repository.find();
    }
}