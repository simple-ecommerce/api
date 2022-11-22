import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { StockProductStatus } from "../../types/enums/StockProductStatus";

export class CreateStockProduct1669084444140 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "stock_products",
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
            name: "application",
            type: "varchar",
            default: `'${StockProductStatus.IN_STOCK}'`,
            enum: Object.values(StockProductStatus),
            enumName: "stock_product_status",
          },
        ],
      })
    );
    queryRunner.createForeignKey(
      "stock_products",
      new TableForeignKey({
        name: "ItemStockProducts",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey("stock_products", "ItemStockProducts");
    queryRunner.dropTable("stock_products");
  }
}
