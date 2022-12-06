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
          { name: "item_id", type: "int", isPrimary: true },
          { name: "specification_id", type: "int", isPrimary: true },
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

    queryRunner.createForeignKey(
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

    queryRunner.createForeignKey(
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey(
      "item_specifications",
      "FK_ItemSpecification_Item"
    );
    queryRunner.dropForeignKey(
      "item_specifications",
      "FK_ItemSpecification_Specification"
    );
    queryRunner.dropTable("item_specifications");
  }
}
