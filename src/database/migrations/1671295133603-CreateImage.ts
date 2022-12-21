import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateImage1671295133603 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "images",
        columns: [
          { name: "id", type: "int", isPrimary: true, isGenerated: true },
          { name: "src", type: "varchar" },
          { name: "file_name", type: "varchar" },
          { name: "item_id", type: "int", isNullable: true },
          { name: "position", type: "int", default: 1 },
          { name: "created_at", type: "timestamp", default: "now()" },
          { name: "updated_at", type: "timestamp", default: "now()" },
          { name: "deleted_at", type: "timestamp", isNullable: true },
        ],
      })
    );
    queryRunner.createForeignKey(
      "images",
      new TableForeignKey({
        name: "FK_Image_Item",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey("images", "FK_Image_Item");
    queryRunner.dropTable("images");
  }
}
