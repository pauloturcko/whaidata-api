import { CardFlagEnum } from "../enum/card-flag-enum";
import {CardTypeEnum} from "../enum/card-type-enum";

export interface CreateCardDto {
    name: string;
    userId: number;
    cardType: CardTypeEnum;
    cardFlag: CardFlagEnum;
    expiresIn: Date;
    limit: number;
    lastFourDigits: string;
}

export type UpdateCardDTO = Partial<CreateCardDto> & {
    id: number;
}