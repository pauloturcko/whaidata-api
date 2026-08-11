import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Cards1774214054264 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "cards",
            uniques: [
                {
                    columnNames: ["user_id", "name", "last_four_digits"]
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
                    name: "user_id",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "limit",
                    type: "decimal",
                    precision: 12,
                    scale: 2,
                },
                {
                    name: "card_type",
                    type: "int",
                },
                {
                    name: "card_flag",
                    type: "int",
                },
                {
                    name: 'expires_in',
                    type: "date",
                },
                {
                    name: "last_four_digits",
                    type: "char",
                    length: '4'
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE cards;")
    }

}
