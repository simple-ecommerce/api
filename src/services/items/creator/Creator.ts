import { Item, ItemSpecification } from "../../../models/catalog";
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
  specifications?: ItemSpecification[];

  constructor({
    company,
    longDescription,
    name,
    price,
    shortDescription,
    sku,
    brand,
    specifications,
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
    specifications?: ItemSpecification[];
  }) {
    this.company = company;
    this.name = name;
    this.longDescription = longDescription;
    this.shortDescription = shortDescription;
    this.price = price;
    this.sku = sku;
    this.brand = brand;
    this.specifications = specifications;
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
      specifications: this.specifications,
      reload: false,
    });

    await item.save();

    return item;
  }
}
