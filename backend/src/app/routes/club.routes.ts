import { Router } from "express";
import clubController from "../controllers/club.controller";

const router = Router();

// Club Registration
router.post("/register", clubController.register);

// Get all clubs
router.get("/", clubController.getAllClubs);

// Get club by ID
router.get("/:id", clubController.getClubById);

// Update club
router.put("/:id", clubController.updateClub);

// Delete club
router.delete("/:id", clubController.deleteClub);

export default router;
