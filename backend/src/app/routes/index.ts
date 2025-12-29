import { Router } from "express";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import clubRoutes from "./club.routes";

const router = Router();

// API Routes
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/clubs", clubRoutes);

export default router;
