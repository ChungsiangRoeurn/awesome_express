import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createTopUp,
  mockBakongWebhook,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/topup", authMiddleware, createTopUp);
router.post("/mock-webhook", mockBakongWebhook);

export default router;
