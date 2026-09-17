export interface CreateUserPaymentMethodsDto {
    userId: number,
    paymentMethodId: number,
    isActive?: boolean
}

export interface UserPaymentMethodsDto {
    paymentMethodId: number,
    name: string,
    slug: string,
    isActive?: boolean
}