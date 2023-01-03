import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCart1672772271031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "carts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "session_token",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "customer_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true,
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      "carts",
      new TableForeignKey({
        name: "FK_Cart_Customer",
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "customers",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("carts", "FK_Cart_Customer");
    await queryRunner.dropTable("carts");
  }
}
