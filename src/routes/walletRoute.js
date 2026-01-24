import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getWallet } from "../controllers/walletController.js";

const router = express.Router();

router.get("/", authMiddleware, getWallet);

export default router;
