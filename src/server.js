import "dotenv/config";
import express from "express";
import { db } from "../src/lib/db.js";
import { router } from "./routes/index.js";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4455;

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello, from expressjs!");
});

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

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
