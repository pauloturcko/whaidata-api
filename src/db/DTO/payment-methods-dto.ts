export interface CreatePaymentMethodsDto {
    userId: number;
    name: string;
    color?: string;
}

export type UpdatePaymentMethodsDto = Partial<CreatePaymentMethodsDto> & {
    id: number
};