import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateItem1669073600021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "company_id",
            type: "int",
          },
          {
            name: "name",
            type: "varchar",
          },
          { name: "short_description", type: "varchar" },
          { name: "long_description", type: "varchar" },
          { name: "price", type: "bigint" },
          { name: "upc", type: "varchar", isNullable: true },
          { name: "sku", type: "varchar", isUnique: true, isNullable: true },
          { name: "ean", type: "varchar", isNullable: true },
          { name: "gtin", type: "varchar", isNullable: true },
          { name: "brand", type: "varchar", isNullable: true },
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
          {
            name: "deleted_at",
            type: "timestamp",
            default: "null",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "items",
      new TableForeignKey({
        name: "CompanyItems",
        columnNames: ["company_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "companies",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("items", "CompanyItems");
    await queryRunner.dropTable("items");
  }
}
