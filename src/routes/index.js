import { Router } from "express";
import { productRoute } from "../routes/product-route.js";
import { authRoute } from "./auth-route.js";
import { orderRoute } from "./order-routes.js";

export const router = Router();

router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/orders", orderRoute);
