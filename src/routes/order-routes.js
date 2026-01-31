import { Router } from "express";
import { orderController } from "../controllers/order-controller.js";

export const orderRoute = Router();

orderRoute.post("/", orderController.create);
orderRoute.get("/", orderController.list);
orderRoute.put("/status", orderController.updateStatus);
orderRoute.delete("/:id", orderController.delete);
