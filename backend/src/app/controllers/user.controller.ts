import { Request, Response } from "express";
import { StatusCodes } from "http-status-toolkit";
import userService from "../services/user.service";

class UserController {
  // Register a new student
  async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        name,
        email,
        phone,
        address,
        university,
        department,
        password,
        confirmPassword,
      } = req.body;

      // Validation
      if (
        !name ||
        !email ||
        !phone ||
        !address ||
        !university ||
        !department ||
        !password
      ) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
        return;
      }

      // Check if passwords match
      if (confirmPassword && password !== confirmPassword) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Passwords do not match",
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

      // Create user
      const newUser = await userService.createUser({
        name,
        email,
        phone,
        address,
        university,
        department,
        password,
      });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Student registered successfully",
        data: newUser,
      });
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.message === "User with this email already exists") {
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to register student",
        error: error.message,
      });
    }
  }

  // Get user by ID
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await userService.getUserById(id);

      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error("Get user error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to get user",
        error: error.message,
      });
    }
  }

  // Get all users
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await userService.getAllUsers(limit, offset);

      res.status(StatusCodes.OK).json({
        success: true,
        data: result.users,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          pages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (error: any) {
      console.error("Get all users error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to get users",
        error: error.message,
      });
    }
  }

  // Update user
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error: any) {
      console.error("Update user error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to update user",
        error: error.message,
      });
    }
  }

  // Delete user
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await userService.deleteUser(id);

      if (!deleted) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      console.error("Delete user error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to delete user",
        error: error.message,
      });
    }
  }
}

export default new UserController();
