import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedAtUpdatedAtToCardsAndBankAccount1790084101589 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("cards", [
            new TableColumn({name: "created_at", type: "timestamp", default: "now()"}),
            new TableColumn({name: "updated_at", type: "timestamp", default: "now()"}),
        ]);

        await queryRunner.addColumns("bank_account", [
            new TableColumn({name: "created_at", type: "timestamp", default: "now()"}),
            new TableColumn({name: "updated_at", type: "timestamp", default: "now()"}),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("bank_account", "updated_at");
        await queryRunner.dropColumn("bank_account", "created_at");
        await queryRunner.dropColumn("cards", "updated_at");
        await queryRunner.dropColumn("cards", "created_at");
    }

}
