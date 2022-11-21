import { Id } from "../../aliases";
import { Customer } from "../../models/core/Customer";

export class CustomerFinder {
  id: Id;

  constructor(id: Id) {
    this.id = id;
  }

  async find() {
    const customer = await Customer.findOneOrFail({
      where: { id: this.id },
    });

    return customer;
  }
}
