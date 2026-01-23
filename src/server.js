import express from "express";
// const express = require("express");
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

import authRoute from "./routes/authRoute.js";
import watchlistRoute from "./routes/watchlistRoute.js";
import movieRoute from "./routes/movieRoute.js";

config();
connectDB();

const app = express();
const PORT = 8080;

// Body parsing json request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DEFINE ROUTES
app.use("/auth", authRoute);
app.use("/watchlist", watchlistRoute);
app.use("/movie", movieRoute);

app.get("/", (req, res) => {
  res.send("Hello, from express without TS");
});

app.listen(PORT, () => {
  console.log(`Server running on 🗿 http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
