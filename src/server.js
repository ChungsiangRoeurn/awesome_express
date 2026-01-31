import "dotenv/config";
import express from "express";
import { db } from "../src/lib/db.js";
import { router } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 4455;

// ======= Define all routes =======
app.use("/api", router);

const server = app.listen(PORT, () => {
  console.log(`Server running on 🗿 http://localhost:${PORT}`);
});

// Graceful shutdown
const disconnectDB = () =>
  new Promise((resolve, reject) => {
    db.end((err) => (err ? reject(err) : resolve()));
  });

const shutdown = async (signal) => {
  console.log(`${signal} received, shutting down...`);
  await disconnectDB();
  server.close(() => {
    console.log("Process terminated");
    process.exit(0);
  });
};

// GLOBAL ERROR MIDDLEWARE
app.use((err, req, res, next) => {
  const message = err.message || "Internal Server Error";
  const statusCode = message.includes("not found") ? 404 : 400;

  console.error(`[ERROR]: ${message}`);

  res.status(statusCode).json({
    success: false,
    message: message,
  });
});

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
