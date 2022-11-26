import { BaseEntity } from "typeorm";
import { Id } from "../../aliases";
import { dataSource } from "../../app-data-source";

type Constructor = new (...args: any[]) => BaseEntity;

export function FinderService<Model extends Constructor>(model: Model) {
  return class {
    id: Id;

    constructor(id: Id) {
      this.id = id;
    }

    async find(): Promise<InstanceType<Model> | null> {
      const entity = await dataSource.getRepository(model as any).findOne({
        where: { id: this.id },
      });

      return entity as InstanceType<Model> | null;
    }
  };
}
