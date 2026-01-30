import { Router } from "express";
import { productRoute } from "./product.js";

export const router = Router();

router.use("/products", productRoute);
