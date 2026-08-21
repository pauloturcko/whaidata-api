import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('payment_methods')
export class PaymentMethods {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar"})
    name: string

    @Column({type: "varchar", unique: true})
    slug: string

    @Column({name: "requires_card", type: "boolean"})
    requiresCard: boolean

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt: Date

}