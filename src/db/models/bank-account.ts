import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Unique(["name", "accountType"])
@Entity("bank_account")
export class BankAccount {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar"})
    name: string;

    @Column({type: "int", name: "account_type"})
    accountType: number;

    @Column({type: "numeric", precision: 12, scale: 2, default: 0})
    balance: string;
    // O TypeORM devolve type: "numerci" como string, se tipar como number perderia a precisao na conversao

    @CreateDateColumn({name: "created_at", type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({name: "updated_at", type: "timestamp"})
    updatedAt: Date;
}   