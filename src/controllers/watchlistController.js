import { prisma } from "../config/db.js";

export const addToWatchlist = async (req, res) => {
  try {
    const { movieId, status, rating, notes } = req.body;
    const userId = req.user.id; // It's from JWT

    if (!movieId || !userId) {
      return res.status(400).json({ error: "MovieId and UserId are Required" });
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
      where: {
        userId,
        movieId,
      },
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

export const removeFromWatchlist = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist no items found!" });
    }

    // Ensure only owner can delete
    if (watchlistItem.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Not allowed to update this watchlist item!" });
    }

    await prisma.watchlistItem.delete({
      where: { id },
    });

    res.status(200).json({
      status: "Success",
      message: "Movie removed from watchlist!",
    });
  } catch (error) {
    console.error("Remove Watching Error at:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateWatchList = async (req, res) => {
  try {
    const { status, rating, notes } = req.body;
    const id = req.params.id;
    const userId = req.user.id;

    const watchlistItem = await prisma.watchlistItem.findUnique({
      where: { id },
    });

    if (!watchlistItem) {
      return res.status(404).json({ error: "Watchlist Items not found!" });
    }

    // Ensure that only ownership can update
    if (watchlistItem.userId !== userId) {
      return res.status(403).json({
        error: "Not Allowed to update the watchlist!",
      });
    }

    // Build update data
    const updateData = {};
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Update watchlist item
    const updateItem = await prisma.watchlistItem.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      status: "Success",
      data: { watchListItem: updateItem },
    });
  } catch (error) {
    console.error("Update Watchlist Error at:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId },
      include: {
        movie: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      status: "Success",
      data: watchlistItems,
    });
  } catch (error) {
    console.error("Watchlist Error at:", error);
    return res.status(500).json({ message: error.message });
  }
};
