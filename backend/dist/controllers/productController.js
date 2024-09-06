"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productService_1 = require("../services/productService");
const router = express_1.default.Router();
router.get("/products", (req, res) => {
    const products = (0, productService_1.getProducts)();
    res.json(products);
});
router.post("/checkout", (req, res) => {
    const items = req.body.items;
    if (!items || !Array.isArray(items)) {
        res.status(400).json({ error: "Invalid request body" });
        return;
    }
    const products = (0, productService_1.getProducts)();
    const { totalCost, promotion } = (0, productService_1.calculateTotalCost)(items, products);
    res.json({ totalCost, promotion });
});
exports.default = router;
