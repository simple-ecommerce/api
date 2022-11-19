import { Id } from "../../aliases";
import { Employee } from "../../models/core/Employee";

export class Finder {
  id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  async find() {
    const employee = await Employee.findOneOrFail({
      where: { id: this.id },
    });

    return employee;
  }
}
