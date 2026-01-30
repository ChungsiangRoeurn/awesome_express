import { productService } from "../services/product-service.js";
import { asyncHandler } from "../utils/async-handler.js";

export const productController = {
  getAll: asyncHandler(async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
  }),

  getById: asyncHandler(async (req, res) => {
    const product = await productService.getProductById(req.params.id);
    res.json(product);
  }),

  create: asyncHandler(async (req, res) => {
    const productId = await productService.createProduct(req.body);
    res.status(201).json({ message: "Product created", productId });
  }),

  update: asyncHandler(async (req, res) => {
    await productService.updateProduct(req.params.id, req.body);
    res.json({ message: "Product updated successfully" });
  }),

  remove: asyncHandler(async (req, res) => {
    await productService.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  }),
};
