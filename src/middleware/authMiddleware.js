import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from the request
// Check if token is valid
export const authMiddleware = async () => {
  console.log("Middleware reached");

  
};
