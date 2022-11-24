import { Item, ItemEspecification } from "../../../models/catalog";
import { Company } from "../../../models/core";

export class ItemCreator {
  company: Company;
  name: string;
  longDescription: string;
  shortDescription: string;
  price: number;
  sku?: string;
  brand?: string;
  upd?: string;
  especifications?: ItemEspecification[];

  constructor({
    company,
    longDescription,
    name,
    price,
    shortDescription,
    sku,
    brand,
    especifications,
    upd,
  }: {
    company: Company;
    name: string;
    longDescription: string;
    shortDescription: string;
    price: number;
    sku?: string;
    upd?: string;
    brand?: string;
    especifications?: ItemEspecification[];
  }) {
    this.company = company;
    this.name = name;
    this.longDescription = longDescription;
    this.shortDescription = shortDescription;
    this.price = price;
    this.sku = sku;
    this.brand = brand;
    this.especifications = especifications;
    this.upd = upd;
  }

  async create() {
    const item = Item.create({
      name: this.name,
      longDescription: this.longDescription,
      shortDescription: this.shortDescription,
      price: this.price,
      sku: this.sku,
      company: this.company,
      brand: this.brand,
      especifications: this.especifications,
      reload: false,
    });

    await item.save();

    return item;
  }
}
