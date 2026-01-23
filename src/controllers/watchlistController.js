import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, userId, status, rating, notes } = req.body;

    if (!movieId || !userId) {
      return res.status(400).json({ error: "movieId and userId are required" });
    }

    // Verify movie exists
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
    });

    if (!movie) {
      return res.status(404).json({ error: "Movie Not Found!" });
    }

    // Check if already added
    const existingInWatchlist = await prisma.watchlistItem.findFirst({
      where: { userId, movieId },
    });

    if (existingInWatchlist) {
      return res.status(400).json({ error: "Movie Already in the Watchlist!" });
    }

    // Create watchlist item
    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
      },
    });

    return res.status(201).json({
      status: "Success",
      data: watchlistItem,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
