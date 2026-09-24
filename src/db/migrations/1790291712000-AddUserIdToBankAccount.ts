import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableUnique } from "typeorm";

export class AddUserIdToBankAccount1790291712000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("bank_account", new TableColumn({
            name: "user_id",
            type: "int",
        }));

        await queryRunner.createForeignKey("bank_account", new TableForeignKey({
            name: "FK_c8d57e8df596573a617476fdff2",
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE"
        }));

        await queryRunner.dropUniqueConstraint("bank_account", "UQ_abc300513b6a96c2d0d41bc0d4b");
        await queryRunner.createUniqueConstraint("bank_account", new TableUnique({
            name: "UQ_3427503afc42a9c04031c827111",
            columnNames: ["user_id", "name", "account_type"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint("bank_account", "UQ_3427503afc42a9c04031c827111");
        await queryRunner.createUniqueConstraint("bank_account", new TableUnique({
            name: "UQ_abc300513b6a96c2d0d41bc0d4b",
            columnNames: ["name", "account_type"]
        }));

        await queryRunner.dropForeignKey("bank_account", "FK_c8d57e8df596573a617476fdff2");
        await queryRunner.dropColumn("bank_account", "user_id");
    }

}
