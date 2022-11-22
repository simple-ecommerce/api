import { query } from "express";
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateStockProductEspecifications1669085691479
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "stock_product_especifications",
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
            name: "item_especification_id",
            type: "int",
          },
        ],
      })
    );
    queryRunner.createForeignKey(
      "stock_product_especifications",
      new TableForeignKey({
        name: "ItemEspecificationStockProducts",
        referencedTableName: "item_especifications",
        referencedColumnNames: ["id"],
        columnNames: ["item_especification_id"],
      })
    );
    queryRunner.createForeignKey(
      "stock_product_especifications",
      new TableForeignKey({
        name: "StockProductItemEspecifications",
        referencedColumnNames: ["id"],
        referencedTableName: "stock_products",
        columnNames: ["stock_product_id"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey(
      "stock_product_especifications",
      "ItemEspecificationStockProducts"
    );
    queryRunner.dropForeignKey(
      "stock_product_especifications",
      "StockProductItemEspecifications"
    );
    queryRunner.dropTable("stock_product_especifications");
  }
}
