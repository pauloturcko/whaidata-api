import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {CardTypeEnum} from "../enum/card-type-enum";

@Entity('cards')
export class Cards {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar'})
    name: string;

    @Column({type: 'varchar', length: 7})
    color: string;

    @Column({ name: "card_type", type: 'enum', enum: CardTypeEnum})
    cardType: number;

    @Column({ name: "expires_in", type: 'date'})
    expiresIn: Date;
}