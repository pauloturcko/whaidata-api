import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Users} from "./users";

@Index(["userId", "name"], {unique: true})
@Entity('payment_methods')
export class PaymentMethods {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "user_id", type: "int"})
    userId: number

    @Column({type: "varchar"})
    name: string

    @Column({type: "varchar", length: 7})
    color: string

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt: Date

    @ManyToOne(() => Users, (user) => user.paymentMethods)
    @JoinColumn({name: "user_id"})
    owner: Users
}