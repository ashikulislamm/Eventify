import { Router } from "express";
import userController from "../controllers/user.controller";

const router = Router();

// Student Registration
router.post("/register", userController.register);

// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", userController.deleteUser);

export default router;
