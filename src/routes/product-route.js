import { Router } from "express";
import { productController } from "../controllers/product-controller.js";

export const productRoute = Router();

productRoute.get("/", productController.getAll);
productRoute.get("/:id", productController.getById);
productRoute.post("/", productController.create);
productRoute.put("/:id", productController.update);
productRoute.delete("/:id", productController.remove);
