import express from "express";
import {
  addToWatchlist,
  getAllWatchlist,
  removeFromWatchlist,
  updateWatchList,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addToWatchlist);
router.delete("/:id", authMiddleware, removeFromWatchlist);
router.patch("/:id", authMiddleware, updateWatchList);
router.get("/", authMiddleware, getAllWatchlist);

export default router;
