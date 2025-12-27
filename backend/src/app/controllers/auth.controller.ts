import { Request, Response } from "express";
import { StatusCodes } from "http-status-toolkit";
import authService from "../services/auth.service";

class AuthController {
  // Student Login
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Email and password are required",
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid email format",
        });
        return;
      }

      // Authenticate user
      const user = await authService.login({ email, password });

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Login successful",
        data: user,
      });
    } catch (error: any) {
      console.error("Login error:", error);

      if (error.message === "Invalid email or password") {
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Login failed. Please try again.",
        error: error.message,
      });
    }
  }

  // Change Password
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.params;
      const { currentPassword, newPassword, confirmPassword } = req.body;

      // Validation
      if (!currentPassword || !newPassword || !confirmPassword) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "New passwords do not match",
        });
        return;
      }

      if (newPassword.length < 6) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
        return;
      }

      await authService.changePassword(userId, currentPassword, newPassword);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error: any) {
      console.error("Change password error:", error);

      if (error.message === "User not found" || error.message === "Current password is incorrect") {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to change password",
        error: error.message,
      });
    }
  }

  // Request Password Reset
  async requestPasswordReset(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Email is required",
        });
        return;
      }

      await authService.requestPasswordReset(email);

      res.status(StatusCodes.OK).json({
        success: true,
        message: "If an account with that email exists, a password reset link has been sent",
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to process password reset request",
        error: error.message,
      });
    }
  }
}

export default new AuthController();
