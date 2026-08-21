import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users";
import { PaymentMethods } from "./payment-methods";

@Index(["userId", "paymentMethodId"], {unique: true})
@Entity("user_payment_preferences")
export class UserPaymentPreferences {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "user_id", type: "int"})
    userId: number

    @Column({name: "payment_method_id", type: "int"})
    paymentMethodId: number;

    @Column({name: "is_active", type: "boolean", default: true})
    isActive: boolean
    
    @CreateDateColumn({name: "created_at", type: "timestamp"})
        createdAt: Date
    
    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
        updatedAt: Date

    @ManyToOne(() => Users, (user) => user.paymentPreferences)
    @JoinColumn({name: "user_id"})
    user: Users

    @ManyToOne(() => PaymentMethods)
    @JoinColumn({name: "payment_method_id"})
    paymentMethod: PaymentMethods
}