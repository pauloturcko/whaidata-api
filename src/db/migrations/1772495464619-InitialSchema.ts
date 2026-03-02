import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1772495464619 implements MigrationInterface {
    name = 'InitialSchema1772495464619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profile_picture" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "name" character varying NOT NULL, "color" character varying(7) NOT NULL, "card_type" "public"."cards_card_type_enum" NOT NULL, "expires_in" date NOT NULL, "last_four_digits" character(4) NOT NULL, CONSTRAINT "UQ_a0fc9fea135979fd33aedd4bbf8" UNIQUE ("user_id", "name", "last_four_digits"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
