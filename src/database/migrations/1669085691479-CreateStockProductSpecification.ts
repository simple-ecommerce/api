import { query } from "express";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStockProductSpecification1669085691479
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "stock_product_specifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "stock_product_id",
            type: "int",
          },
          {
            name: "item_specification_id",
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
      "stock_product_specifications",
      new TableForeignKey({
        name: "StockProductSpecificationItemSpecification",
        referencedTableName: "item_specifications",
        referencedColumnNames: ["id"],
        columnNames: ["item_specification_id"],
      })
    );
    queryRunner.createForeignKey(
      "stock_product_specifications",
      new TableForeignKey({
        name: "StockProductSpecificationStockProduct",
        referencedColumnNames: ["id"],
        referencedTableName: "stock_products",
        columnNames: ["stock_product_id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey(
      "StockProductSpecificationItemSpecification",
      "StockProductSpecificationItemSpecification"
    );
    queryRunner.dropForeignKey(
      "stock_product_specifications",
      "StockProductSpecificationStockProduct"
    );
    queryRunner.dropTable("stock_product_specifications");
  }
}
