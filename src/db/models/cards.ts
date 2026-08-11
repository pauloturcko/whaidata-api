import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import {Users} from "./users";

@Entity("cards")
@Unique(["userId", "name", "lastFourDigits"])
export class Cards {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "decimal", precision: 12, scale: 2})
    limit: number;

    @Column({name: "card_type", type: "int"})
    cardType: number;

    @Column({name: "card_flag", type: "int"})
    cardFlag: number;

    @Column({name: "expires_in", type: "date"})
    expiresIn: Date;

    @Column({name: "last_four_digits", type: "char", length: 4})
    lastFourDigits: string;

    @ManyToOne(() => Users, (cards) => cards.cards)
    @JoinColumn({name: "user_id"})
    owner: Users
}