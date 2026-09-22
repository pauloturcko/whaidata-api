import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity('payment_methods')
export class PaymentMethods {

    @PrimaryGeneratedColumn()
    id: number
    
    @Column({type: "varchar", length: 50})
    name: string

    @Column({type: "varchar", length: 50, unique: true})
    slug: string

    @Column({name: "requires_card", type: "boolean"})
    requiresCard: boolean

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt: Date

}