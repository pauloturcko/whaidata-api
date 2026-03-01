import {CardTypeEnum} from "../enum/card-type-enum";

export interface RegisterCardTypeDto {
    name: string;
    userId: number;
    color: string;
    cardType: CardTypeEnum;
    expiresIn: Date;
    lastFourDigits: string;
}