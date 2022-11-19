import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";
import { Application } from "../../types/enums/Application";

export class CreateRefreshToken1668791371030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "customer_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "employee_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "application",
            type: "varchar",
            default: `'${Application.CUSTOMER_WEB_APP}'`,
            enum: Object.values(Application),
            enumName: "application",
          },
          {
            name: "token",
            type: "varchar",
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
      "refresh_tokens",
      new TableForeignKey({
        name: "RefreshTokenCustomer",
        columnNames: ["customer_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "customers",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    queryRunner.createForeignKey(
      "refresh_tokens",
      new TableForeignKey({
        name: "RefreshTokenEmployee",
        columnNames: ["employee_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "employees",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropForeignKey("refresh_tokens", "RefreshTokenCustomer");
    queryRunner.dropForeignKey("refresh_tokens", "RefreshTokenEmployee");
    queryRunner.dropTable("refresh_tokens");
  }
}
