import { Request, Response } from "express";
import { StatusCodes } from "http-status-toolkit";
import clubService from "../services/club.service";

class ClubController {
  // Register a new club
  async register(req: Request, res: Response): Promise<void> {
    try {
      const {
        clubName,
        email,
        phone,
        university,
        description,
        presidentName,
        presidentEmail,
        password,
        confirmPassword,
      } = req.body;

      // Validation
      if (
        !clubName ||
        !email ||
        !phone ||
        !university ||
        !description ||
        !presidentName ||
        !presidentEmail ||
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

      if (!emailRegex.test(presidentEmail)) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Invalid president email format",
        });
        return;
      }

      // Create club
      const newClub = await clubService.createClub({
        clubName,
        email,
        phone,
        university,
        description,
        presidentName,
        presidentEmail,
        password,
      });

      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Club registered successfully",
        data: newClub,
      });
    } catch (error: any) {
      console.error("Club registration error:", error);

      if (error.message === "Club with this email already exists") {
        res.status(StatusCodes.CONFLICT).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to register club",
        error: error.message,
      });
    }
  }

  // Get club by ID
  async getClubById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const club = await clubService.getClubById(id);

      if (!club) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Club not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        data: club,
      });
    } catch (error: any) {
      console.error("Get club error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to get club",
        error: error.message,
      });
    }
  }

  // Get all clubs
  async getAllClubs(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;

      const result = await clubService.getAllClubs(limit, offset);

      res.status(StatusCodes.OK).json({
        success: true,
        data: result.clubs,
        pagination: {
          total: result.total,
          limit: result.limit,
          offset: result.offset,
          pages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (error: any) {
      console.error("Get all clubs error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to get clubs",
        error: error.message,
      });
    }
  }

  // Update club
  async updateClub(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedClub = await clubService.updateClub(id, updateData);

      if (!updatedClub) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Club not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Club updated successfully",
        data: updatedClub,
      });
    } catch (error: any) {
      console.error("Update club error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to update club",
        error: error.message,
      });
    }
  }

  // Delete club
  async deleteClub(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await clubService.deleteClub(id);

      if (!deleted) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Club not found",
        });
        return;
      }

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Club deleted successfully",
      });
    } catch (error: any) {
      console.error("Delete club error:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to delete club",
        error: error.message,
      });
    }
  }
}

export default new ClubController();
