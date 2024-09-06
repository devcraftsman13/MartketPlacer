import { Product } from "../models/productModel";
import * as fs from "fs";
import * as path from "path";

export const getProducts = (): Product[] => {
  const filePath = path.resolve(__dirname, "../public/products.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

export const calculateTotalCost = (
  items: { uuid: number; quantity: number }[],
  products: Product[]
): { totalCost: number; promotion: string } => {
  const total = items.reduce((acc, item) => {
    const product = products.find((p) => p.uuid === item.uuid);
    if (product) {
      return acc + parseFloat(product.price);
    }
    return acc;
  }, 0);

  let promotion = "No discount";
  let discount = 0;

  if (total > 100) {
    promotion = "20% off on total greater than $100";
    discount = total * 0.2;
  } else if (total > 50) {
    promotion = "15% off on total greater than $50";
    discount = total * 0.15;
  } else if (total > 20) {
    promotion = "10% off on total greater than $20";
    discount = total * 0.1;
  }

  return { totalCost: total - discount, promotion };
};
