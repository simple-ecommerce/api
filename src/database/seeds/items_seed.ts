import { itemFactory } from "../factories/item_factory";
import { companiesSeed } from "./companies_seed";

export const itemsSeed = async ({
  companies,
}: {
  companies: Awaited<ReturnType<typeof companiesSeed>>;
}) => {
  const postIt = await itemFactory({
    company: companies.dunderMifflin,
    name: "Post-it",
    sku: "0000000001",
    price: 3 * 100,
    ean: "0000000001",
    longDescription:
      "Small piece of paper with a re-adherable strip of glue on its back, made for temporarily attaching notes to documents and other surfaces",
    shortDescription: "Post-it sticker to attach",
    brand: "3M",
  });

  const bicPen = await itemFactory({
    company: companies.dunderMifflin,
    name: "Bic Pen",
    sku: "0000000002",
    price: 1 * 100,
    ean: "0000000002",
    longDescription: "Ballpoint pen with a plastic body and a metal clip.",
    shortDescription: "Ballpoint pen",
    brand: "Bic",
  });

  const a4Paper = await itemFactory({
    company: companies.dunderMifflin,
    name: "A4 Paper",
    sku: "0000000003",
    price: 2 * 100,
    ean: "0000000003",
    longDescription: "A4 paper for printing documents and other stuff.",
    shortDescription: "A4 paper",
  });

  const corporateBlazer = await itemFactory({
    company: companies.arasaka,
    ean: "0000000004",
    name: "Corporate Blazer",
    price: 1200 * 100,
    sku: "0000000004",
    longDescription: "A blazer for corporate events and protection.",
    shortDescription: "Corporate blazer",
    brand: "Arasaka Clothes",
  });

  const corporatePants = await itemFactory({
    company: companies.arasaka,
    ean: "0000000005",
    name: "Corporate Pants",
    price: 1000 * 100,
    sku: "0000000005",
    longDescription: "Pants for corporate events and protection.",
    shortDescription: "Corporate pants",
    brand: "Arasaka Clothes",
  });

  const spaceSuit = await itemFactory({
    company: companies.arasaka,
    ean: "0000000006",
    name: "Space Suit",
    price: 100000 * 100,
    sku: "0000000006",
    longDescription: "Space suit for space travel.",
    shortDescription: "Space suit",
    brand: "Arasaka Clothes",
  });

  return {
    postIt,
    bicPen,
    a4Paper,
    corporateBlazer,
    corporatePants,
    spaceSuit,
  };
};
