import {MigrationInterface, QueryRunner, Table} from "typeorm";
import {PaymentMethods} from "../models/payment-methods";

export class CreatePaymentMethods1774342916121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "payment_methods",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "50",
                    isNullable: false
                },
                {
                    name: "slug",
                    type: "varchar",
                    length: "50",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "requires_card",
                    type: "boolean",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                    onUpdate: "now()",
                }
            ],
        }))

        await queryRunner.manager.insert(PaymentMethods, [
            {name: "Pix", slug: "pix", requiresCard: false},
            {name: "Boleto", slug: "bank_slip", requiresCard: false},
            {name: "Dinheiro", slug: "cash", requiresCard: false},
            {name: "Cartão de Débito", slug: "debit_card", requiresCard: true},
            {name: "Cartão de Crédito", slug: "credit_card", requiresCard: true},
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payment_methods");
    }

}
