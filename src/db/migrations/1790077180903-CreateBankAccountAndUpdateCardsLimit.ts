import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey, TableUnique } from "typeorm";

export class CreateBankAccountAndUpdateCardsLimit1790077180903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "bank_account",
            uniques: [
                {
                    columnNames: ["name", "account_type"]
                }
            ],
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
                },
                {
                    name: "account_type",
                    type: "int",
                },
                {
                    name: "balance",
                    type: "numeric",
                    precision: 12,
                    scale: 2,
                    default: 0,
                },
            ]
        }));

        await queryRunner.changeColumn("cards", "limit", new TableColumn({
            name: "limit",
            type: "numeric",
            precision: 12,
            scale: 2,
            default: 0,
        }));

        await queryRunner.dropForeignKey("user_system_preferences", "FK_b91ba968d5c8be4ee5a3b14ceb4");
        await queryRunner.createUniqueConstraint("user_system_preferences", new TableUnique({
            name: "UQ_b91ba968d5c8be4ee5a3b14ceb4",
            columnNames: ["user_id"]
        }));
        await queryRunner.createForeignKey("user_system_preferences", new TableForeignKey({
            name: "FK_b91ba968d5c8be4ee5a3b14ceb4",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("user_system_preferences", "FK_b91ba968d5c8be4ee5a3b14ceb4");
        await queryRunner.dropUniqueConstraint("user_system_preferences", "UQ_b91ba968d5c8be4ee5a3b14ceb4");
        await queryRunner.createForeignKey("user_system_preferences", new TableForeignKey({
            name: "FK_b91ba968d5c8be4ee5a3b14ceb4",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));

        await queryRunner.changeColumn("cards", "limit", new TableColumn({
            name: "limit",
            type: "numeric",
            precision: 12,
            scale: 2,
        }));

        await queryRunner.dropTable("bank_account");
    }

}
