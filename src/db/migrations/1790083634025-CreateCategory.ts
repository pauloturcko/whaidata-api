import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateCategory1790083634025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "category",
            uniques: [
                {
                    columnNames: ["user_id", "name"]
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
                    name: "user_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "icon",
                    type: "varchar",
                    length: "50",
                },
                {
                    name: "color",
                    type: "varchar",
                    length: "7",
                },
                {
                    name: "type",
                    type: "int",
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
                },
            ],
            foreignKeys: [
                new TableForeignKey({
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }),
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("category");
    }

}
