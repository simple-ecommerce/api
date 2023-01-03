import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateEmployeeCompany1667180442314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "employee_companies",
        columns: [
          { name: "company_id", type: "int", isPrimary: true },
          { name: "employee_id", type: "int", isPrimary: true },
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
    await queryRunner.createForeignKey(
      "employee_companies",
      new TableForeignKey({
        name: "FK_EmployeeCompany_Employee",
        columnNames: ["employee_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "employees",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    await queryRunner.createForeignKey(
      "employee_companies",
      new TableForeignKey({
        name: "FK_EmployeeCompany_Company",
        columnNames: ["company_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "companies",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "FK_EmployeeCompany_Employee",
      "employee_companies"
    );
    await queryRunner.dropForeignKey(
      "FK_EmployeeCompany_Company",
      "employee_companies"
    );
    await queryRunner.dropTable("employee_companies");
  }
}
