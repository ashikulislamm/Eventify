import { Router } from "express";
import eventController from "../controllers/event.controller";
// import { verifyClubToken } from "../middlewares/auth.middleware";

const router = Router();

// Public routes
router.get("/", eventController.getAllEvents);
router.get("/search", eventController.searchEvents);
router.get("/slug/:slug", eventController.getEventBySlug);
router.get("/:id", eventController.getEventById);
router.get("/club/:clubId", eventController.getEventsByClubId);

// Temporarily public until JWT authentication is implemented
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

// TODO: Re-enable authentication when JWT is properly implemented
// router.post("/", verifyClubToken, eventController.createEvent);
// router.put("/:id", verifyClubToken, eventController.updateEvent);
// router.delete("/:id", verifyClubToken, eventController.deleteEvent);

export default router;
