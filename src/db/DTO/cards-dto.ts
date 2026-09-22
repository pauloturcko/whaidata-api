import { CardFlagEnum } from "../enum/card-flag-enum";
import {CardTypeEnum} from "../enum/card-type-enum";

export interface CreateCardDto {
    userId: number;
    name: string;
    cardType: CardTypeEnum;
    cardFlag: CardFlagEnum;
    expiresIn: Date;
    limit: string;
    lastFourDigits: string;
}

export type UpdateCardDTO = Partial<CreateCardDto> & {
    id: number;
}