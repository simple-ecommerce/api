import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCartItemSpecification1672772805926
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart_item_specifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "cart_item_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "item_specification_id",
            type: "int",
            isNullable: false,
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
      "cart_item_specifications",
      new TableForeignKey({
        name: "FK_CartItemSpecification_CartItem",
        columnNames: ["cart_item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "cart_items",
      })
    );
    await queryRunner.createForeignKey(
      "cart_item_specifications",
      new TableForeignKey({
        name: "FK_CartItemSpecification_ItemSpecification",
        columnNames: ["item_specification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "item_specifications",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "cart_item_specifications",
      "FK_CartItemSpecification_CartItem"
    );
    await queryRunner.dropForeignKey(
      "cart_item_specifications",
      "FK_CartItemSpecification_ItemSpecification"
    );
    await queryRunner.dropTable("cart_item_specifications");
  }
}
