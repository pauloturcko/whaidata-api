import { PaymentMethods } from "../models/payment-methods";

export interface CreateUserPaymentMethodsDto {
    userId: number,
    paymentMethodId: number,
    isActive?: boolean
}