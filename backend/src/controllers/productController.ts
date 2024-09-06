import express, { Request, Response } from "express";
import { getProducts, calculateTotalCost } from "../services/productService";
import { Product } from "../models/productModel";

const router = express.Router();

router.get("/products", (req: Request, res: Response): void => {
  const products = getProducts();
  res.json(products);
});

router.post("/checkout", (req: Request, res: Response): void => {
  const items = req.body.items;
  if (!items || !Array.isArray(items)) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const products = getProducts();
  const { totalCost, promotion } = calculateTotalCost(items, products);
  res.json({ totalCost, promotion });
});


export default router;