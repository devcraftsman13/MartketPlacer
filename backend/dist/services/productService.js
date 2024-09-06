"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalCost = exports.getProducts = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const getProducts = () => {
    const filePath = path.resolve(__dirname, "../public/products.json");
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};
exports.getProducts = getProducts;
const calculateTotalCost = (items, products) => {
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
    }
    else if (total > 50) {
        promotion = "15% off on total greater than $50";
        discount = total * 0.15;
    }
    else if (total > 20) {
        promotion = "10% off on total greater than $20";
        discount = total * 0.1;
    }
    return { totalCost: total - discount, promotion };
};
exports.calculateTotalCost = calculateTotalCost;
