import "dotenv/config";
import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  try {
    console.log("⏳ Starting migration...");
    const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");

    await connection.query(schema);
    console.log("✅ Migration successful: Tables created!");

    // Run seed here
    const seedPath = path.join(__dirname, "seed.sql");
    if (fs.existsSync(seedPath)) {
      const seed = fs.readFileSync(seedPath, "utf8");
      await connection.query(seed);
      console.log("🌱 Seeding successful: Dummy data added!");
    }
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await connection.end();
  }
}

migrate();
