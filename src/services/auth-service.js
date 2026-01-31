import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { authRepository } from "../respositories/auth-repo.js";

export const authService = {
  // ===== Register user =====
  async registerUser({ username, email, password }) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // store user in DB
    return await authRepository.create(username, email, hashedPassword);
  },

  // ===== Login user =====
  async loginUser({ email, password }) {
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("User not found");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    return { user, token };
  },

  // ===== Forget password =====
  async forgotPassword(email) {
    const user = await authRepository.findByEmail(email);
    if (!user) throw new Error("Email not found");

    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await authRepository.saveResetToken(user.id, token, expiresAt);

    console.log("RESET TOKEN:", token);
    return { resetToken: token };
  },

  // ===== Reset =====
  async resetPassword(token, newPassword) {
    const record = await authRepository.findResetToken(token);
    if (!record) throw new Error("Token expired or invalid");

    const hashed = await bcrypt.hash(newPassword, 10);

    await authRepository.updatePassword(record.user_id, hashed);
    await authRepository.deleteResetToken(token);

    return true;
  },
};
