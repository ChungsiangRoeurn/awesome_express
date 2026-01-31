import { authService } from "../services/auth-service.js";

export const register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ success: true, message: "User registered!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body);
    res.json({
      success: true,
      user: { id: user.id, username: user.username },
      token,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword(email);

    res.json({
      success: true,
      message: "Reset token created!",
      token: data.resetToken,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);

    res.json({ success: true, message: "Password updated" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
