import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBankAccountAndUpdateCardsLimit1790077180903 implements MigrationInterface {
    name = 'CreateBankAccountAndUpdateCardsLimit1790077180903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bank_account" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "account_type" integer NOT NULL, "balance" numeric(12,2) NOT NULL DEFAULT '0', CONSTRAINT "UQ_abc300513b6a96c2d0d41bc0d4b" UNIQUE ("name", "account_type"), CONSTRAINT "PK_f3246deb6b79123482c6adb9745" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "limit" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user_system_preferences" DROP CONSTRAINT "FK_b91ba968d5c8be4ee5a3b14ceb4"`);
        await queryRunner.query(`ALTER TABLE "user_system_preferences" ADD CONSTRAINT "UQ_b91ba968d5c8be4ee5a3b14ceb4" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "user_system_preferences" ADD CONSTRAINT "FK_b91ba968d5c8be4ee5a3b14ceb4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_system_preferences" DROP CONSTRAINT "FK_b91ba968d5c8be4ee5a3b14ceb4"`);
        await queryRunner.query(`ALTER TABLE "user_system_preferences" DROP CONSTRAINT "UQ_b91ba968d5c8be4ee5a3b14ceb4"`);
        await queryRunner.query(`ALTER TABLE "user_system_preferences" ADD CONSTRAINT "FK_b91ba968d5c8be4ee5a3b14ceb4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "limit" DROP DEFAULT`);
        await queryRunner.query(`DROP TABLE "bank_account"`);
    }

}
