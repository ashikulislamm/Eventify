import { Router } from "express";
import authController from "../controllers/auth.controller";

const router = Router();

// Student Login
router.post("/login", authController.login);

// Change Password
router.post("/change-password/:userId", authController.changePassword);

// Request Password Reset
router.post("/forgot-password", authController.requestPasswordReset);

export default router;
