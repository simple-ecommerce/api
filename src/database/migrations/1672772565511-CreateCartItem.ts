import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCartItem1672772565511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cart_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "cart_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "item_id",
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
      "cart_items",
      new TableForeignKey({
        name: "FK_CartItem_Cart",
        columnNames: ["cart_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "carts",
      })
    );
    await queryRunner.createForeignKey(
      "cart_items",
      new TableForeignKey({
        name: "FK_CartItem_Item",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("cart_items", "FK_CartItem_Cart");
    await queryRunner.dropForeignKey("cart_items", "FK_CartItem_Item");
    await queryRunner.dropTable("cart_items");
  }
}
