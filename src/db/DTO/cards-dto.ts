import {CardTypeEnum} from "../enum/card-type-enum";

export interface CreateCardDto {
    name: string;
    userId: number;
    color: string;
    cardType: CardTypeEnum;
    expiresIn: Date;
    lastFourDigits: string;
}

export type UpdateCardDTO = Partial<CreateCardDto> & {
    id: number;
}