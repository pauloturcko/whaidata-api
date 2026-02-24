import {CardTypeEnum} from "../enum/card-type-enum";

export interface RegisterCardTypeDto {
    name: string;
    color: string;
    cardType: CardTypeEnum;
    expiresIn: Date;
}