import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from "./users";

@Entity("user_system_preferences")
@Index(["userId"], {unique: true})
export class UserSystemPreferences {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: "user_id", type: "int"})
    userId: number

    @Column({type: "int"})
    currency: number;

    @Column({type: "int"})
    language: number;

    @Column({type: "int"})
    theme: number

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt: Date

    @OneToOne(() => Users, (user) => user.systemPreferences, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user: Users
}