import {Repository} from "typeorm";
import {PaymentMethods} from "../models/payment-methods";
import {appDataSource} from "../config/data-source";
import {CreatePaymentMethodsDto, UpdatePaymentMethodsDto} from "../DTO/payment-methods-dto";

export class PaymentMethodsRepository {
    private repository: Repository<PaymentMethods>

    constructor() {
        this.repository = appDataSource.getRepository(PaymentMethods)
    }

    async create(data: CreatePaymentMethodsDto) {
        return await this.repository.save(data)
    }

    async loadAll(userId: number): Promise<PaymentMethods[]> {
        return await this.repository.find({where: {userId: userId}});
    }

    async loadById(id: number): Promise<PaymentMethods | null> {
        return await this.repository.findOne({where: {id}})
    }

    async update(data: UpdatePaymentMethodsDto): Promise<PaymentMethods> {
        return await this.repository.save({...data})
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({id})
    }
}