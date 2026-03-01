import {Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import {CardTypeEnum} from "../enum/card-type-enum";

@Entity("cards")
@Unique(["userId", "name", "lastFourDigits"])
export class Cards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar", length: 7})
    color: string;

    @Column({name: "card_type", type: "enum", enum: CardTypeEnum})
    cardType: number;

    @Column({name: "expires_in", type: "date"})
    expiresIn: Date;

    @Column({name: "last_four_digits", type: "char", length: 4})
    lastFourDigits: string;
}