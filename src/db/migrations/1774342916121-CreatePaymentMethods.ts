import {MigrationInterface, QueryRunner, Table} from "typeorm";

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

        await queryRunner.query(`
            INSERT INTO payment_methods (name, slug, requires_card) VALUES
            ('Pix', 'pix', false),
            ('Boleto', 'bank_slip', false),
            ('Dinheiro', 'cash', false),
            ('Cartão de Débito', 'debit_card', true),
            ('Cartão de Crédito', 'credit_card', true)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE payment_methods');
    }

}
