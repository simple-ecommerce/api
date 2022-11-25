import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateItemSpecification1669077633292
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "item_specifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "item_id",
            type: "int",
          },
          {
            name: "specification_id",
            type: "int",
          },
          {
            name: "price_extra",
            type: "bigint",
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
          {
            name: "deleted_at",
            type: "timestamp",
            default: "null",
            isNullable: true,
          },
        ],
      })
    );

    queryRunner.createForeignKey(
      "item_specifications",
      new TableForeignKey({
        name: "SpecificationItem",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    queryRunner.createForeignKey(
      "item_specifications",
      new TableForeignKey({
        name: "ItemSpecifications",
        columnNames: ["specification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "specifications",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey("item_specifications", "SpecificationItem");
    queryRunner.dropForeignKey("item_specifications", "ItemSpecifications");
    queryRunner.dropTable("item_specifications");
  }
}
