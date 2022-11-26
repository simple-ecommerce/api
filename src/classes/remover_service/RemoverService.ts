import { BaseEntity } from "typeorm";
import { dataSource } from "../../app-data-source";

type Constructor = new (...args: any[]) => BaseEntity;

export function RemoverService<Model extends Constructor>(model: Model) {
  return class {
    entity: InstanceType<Model>;

    constructor(entity: InstanceType<Model>) {
      this.entity = entity;
    }

    async remove(): Promise<InstanceType<Model>> {
      const removed = await dataSource
        .getRepository(model)
        .softRemove(this.entity);

      return removed;
    }
  };
}
