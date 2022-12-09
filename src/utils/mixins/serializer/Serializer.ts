import { BaseEntity } from "typeorm";

export function Serializer<T extends BaseEntity, SerializedData>(
  serializer: (data: T) => SerializedData
) {
  return class {
    serializer: (data: T) => SerializedData;

    constructor() {
      this.serializer = serializer;
    }

    serialize(data: T): SerializedData {
      return this.serializer(data);
    }

    serializeMany(data: T[]): SerializedData[] {
      return data.map((item) => this.serializer(item));
    }
  };
}
