import { Item } from "../../../models/catalog";

export class ItemUpdater {
  item: Item;

  constructor(item: Item) {
    this.item = item;
  }

  async update({
    name,
    shortDescription,
    longDescription,
    price,
    sku,
    upc,
    ean,
    gtin,
    brand,
  }: {
    name?: string;
    shortDescription?: string;
    longDescription?: string;
    price?: number;
    sku?: string;
    upc?: string;
    ean?: string;
    gtin?: string;
    brand?: string;
  }) {
    if (name) this.item.name = name;
    if (shortDescription) this.item.shortDescription = shortDescription;
    if (longDescription) this.item.longDescription = longDescription;
    if (price) this.item.price = price;
    if (sku) this.item.sku = sku;
    if (upc) this.item.upc = upc;
    if (ean) this.item.ean = ean;
    if (gtin) this.item.gtin = gtin;
    if (brand) this.item.brand = brand;

    return this.item.save();
  }
}
