import { Router } from "express";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
} from "../controllers/auth-controller.js";

export const authRoute = Router();

authRoute.post("/register", register);
authRoute.post("/login", login);
authRoute.post("/forget-password", forgetPassword);
authRoute.post("/reset-password", resetPassword);
