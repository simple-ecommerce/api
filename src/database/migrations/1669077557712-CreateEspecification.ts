import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateEspecification1669077557712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "especifications",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "expecification_type_id",
            type: "int",
          },
        ],
      })
    );
    queryRunner.createForeignKey(
      "especifications",
      new TableForeignKey({
        name: "EspecificationType",
        columnNames: ["expecification_type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "especification_types",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable("especifications");
    queryRunner.dropForeignKey("especifications", "EspecificationType");
  }
}
