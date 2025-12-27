import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = Router();

// API Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
