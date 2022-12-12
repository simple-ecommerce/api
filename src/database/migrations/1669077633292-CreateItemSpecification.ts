import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableCheck,
  TableForeignKey,
  TableIndex,
  TableUnique,
  Unique,
} from "typeorm";

export class CreateItemSpecification1669077633292
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
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
          { name: "item_id", type: "int" },
          { name: "specification_id", type: "int" },
          {
            name: "price_extra",
            type: "bigint",
            default: 0,
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

    await queryRunner.createForeignKey(
      "item_specifications",
      new TableForeignKey({
        name: "FK_ItemSpecification_Item",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "item_specifications",
      new TableForeignKey({
        name: "FK_ItemSpecification_Specification",
        columnNames: ["specification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "specifications",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createIndex(
      "item_specifications",
      new TableIndex({
        name: "IDX_ItemSpecification_Item_Specification",
        columnNames: ["item_id", "specification_id"],
        isUnique: true,
        where: "deleted_at IS NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "item_specifications",
      "FK_ItemSpecification_Item"
    );
    await queryRunner.dropForeignKey(
      "item_specifications",
      "FK_ItemSpecification_Specification"
    );
    await queryRunner.dropIndex(
      "item_specifications",
      "IDX_ItemSpecification_Item_Specification"
    );
    await queryRunner.dropTable("item_specifications");
  }
}
