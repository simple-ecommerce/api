import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateEmployeeCompany1667180442314 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: "employee_companies",
        columns: [
          { name: "company_id", type: "varchar", isPrimary: true },
          { name: "employee_id", type: "varchar", isPrimary: true },
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
      "employees",
      new TableForeignKey({
        name: "FK_EmployeeCompany_Employee",
        columnNames: ["employee_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "employees",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
    queryRunner.createForeignKey(
      "companies",
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
    queryRunner.dropForeignKey(
      "FK_EmployeeCompany_Employee",
      "employee_companies"
    );
    queryRunner.dropForeignKey(
      "FK_EmployeeCompany_Company",
      "employee_companies"
    );
    queryRunner.dropTable("employee_companies");
  }
}
