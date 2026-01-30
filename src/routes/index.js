import { Router } from "express";
import { productRoute } from "../routes/product-route.js";

export const router = Router();

router.use("/products", productRoute);
