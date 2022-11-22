import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateItemEspecification1669077633292
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "item_especifications",
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
            name: "especification_id",
            type: "int",
          },
          {
            name: "price_extra",
            type: "bigint",
          },
        ],
      })
    );

    queryRunner.createForeignKey(
      "item_especifications",
      new TableForeignKey({
        name: "ItemEspecifications",
        columnNames: ["item_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "items",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    queryRunner.createForeignKey(
      "item_especifications",
      new TableForeignKey({
        name: "EspecificationItems",
        columnNames: ["especification_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "especifications",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("item_especifications");
    queryRunner.dropForeignKey("item_especifications", "ItemEspecifications");
    queryRunner.dropForeignKey("item_especifications", "EspecificationItems");
  }
}
