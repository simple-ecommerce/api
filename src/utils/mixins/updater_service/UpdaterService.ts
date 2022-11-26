import { BaseEntity } from "typeorm";

type Constructor = new (...args: any[]) => BaseEntity;

export function UpdaterService<
  Keys extends keyof InstanceType<Model>,
  Model extends Constructor
>(model: Model) {
  return class {
    entity: InstanceType<Model>;

    constructor(entity: InstanceType<Model>) {
      this.entity = entity;
    }

    async update(
      attributes: Pick<Partial<InstanceType<Model>>, Keys>
    ): Promise<InstanceType<Model>> {
      Object.keys(attributes).forEach((key) => {
        (this.entity as any)[key] = (attributes as any)[key];
      });

      return this.entity.save();
    }
  };
}
