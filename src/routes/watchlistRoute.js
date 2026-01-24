import express from "express";
import {
  addToWatchlist,
  getAllWatchlist,
  removeFromWatchlist,
  updateWatchList,
} from "../controllers/watchlistController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchlistSchema } from "../validators/watchlistValidator.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), addToWatchlist);
router.patch("/:id", validateRequest, updateWatchList);
router.delete("/:id", removeFromWatchlist);
router.get("/", getAllWatchlist);

export default router;
