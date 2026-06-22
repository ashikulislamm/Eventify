import { Request, Response } from "express";
import eventService from "../services/event.service";

class EventController {
  async createEvent(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        category,
        venue,
        address,
        city,
        start_date,
        end_date,
        start_time,
        end_time,
        max_attendees,
        price,
        is_paid,
        image,
        tags,
        highlights,
        requirements,
        club_id,
      } = req.body;

      // Validate required fields
      if (
        !title ||
        !description ||
        !category ||
        !venue ||
        !address ||
        !city ||
        !start_date ||
        !end_date ||
        !start_time ||
        !end_time ||
        !club_id
      ) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields",
        });
      }

      // TODO: Re-enable when JWT authentication is implemented
      // Verify club ownership (from auth middleware)
      // const clubFromToken = (req as any).club;
      // if (!clubFromToken || clubFromToken.id !== club_id) {
      //   return res.status(403).json({
      //     success: false,
      //     message: "Unauthorized to create event for this club",
      //   });
      // }

      const event = await eventService.createEvent({
        title,
        description,
        category,
        venue,
        address,
        city,
        start_date,
        end_date,
        start_time,
        end_time,
        max_attendees,
        price: price || 0,
        is_paid: is_paid || false,
        image,
        tags,
        highlights,
        requirements,
        club_id,
      });

      return res.status(201).json({
        success: true,
        message: "Event created successfully",
        data: event,
      });
    } catch (error: any) {
      console.error("Error in createEvent controller:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to create event",
      });
    }
  }

  async getAllEvents(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await eventService.getAllEvents(page, limit);

      return res.status(200).json({
        success: true,
        message: "Events fetched successfully",
        data: result,
      });
    } catch (error: any) {
      console.error("Error in getAllEvents controller:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch events",
      });
    }
  }

  async getEventById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const event = await eventService.getEventById(id);

      return res.status(200).json({
        success: true,
        message: "Event fetched successfully",
        data: event,
      });
    } catch (error: any) {
      console.error("Error in getEventById controller:", error);
      return res.status(error.message === "Event not found" ? 404 : 500).json({
        success: false,
        message: error.message || "Failed to fetch event",
      });
    }
  }

  async getEventBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      const event = await eventService.getEventBySlug(slug);

      return res.status(200).json({
        success: true,
        message: "Event fetched successfully",
        data: event,
      });
    } catch (error: any) {
      console.error("Error in getEventBySlug controller:", error);
      return res.status(error.message === "Event not found" ? 404 : 500).json({
        success: false,
        message: error.message || "Failed to fetch event",
      });
    }
  }

  async getEventsByClubId(req: Request, res: Response) {
    try {
      const { clubId } = req.params;

      const events = await eventService.getEventsByClubId(clubId);

      return res.status(200).json({
        success: true,
        message: "Club events fetched successfully",
        data: events,
      });
    } catch (error: any) {
      console.error("Error in getEventsByClubId controller:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch club events",
      });
    }
  }

  async updateEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Re-enable when JWT authentication is implemented
      // const clubFromToken = (req as any).club;
      // if (!clubFromToken) {
      //   return res.status(403).json({
      //     success: false,
      //     message: "Unauthorized",
      //   });
      // }

      // Temporarily use club_id from request body
      const club_id = req.body.club_id;

      const event = await eventService.updateEvent(id, req.body, club_id);

      return res.status(200).json({
        success: true,
        message: "Event updated successfully",
        data: event,
      });
    } catch (error: any) {
      console.error("Error in updateEvent controller:", error);
      return res
        .status(
          error.message.includes("not found") ||
            error.message.includes("unauthorized")
            ? 404
            : 500
        )
        .json({
          success: false,
          message: error.message || "Failed to update event",
        });
    }
  }

  async deleteEvent(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // TODO: Re-enable when JWT authentication is implemented
      // const clubFromToken = (req as any).club;
      // if (!clubFromToken) {
      //   return res.status(403).json({
      //     success: false,
      //     message: "Unauthorized",
      //   });
      // }

      // Temporarily use club_id from request body or query
      const club_id = req.body.club_id || (req.query.club_id as string);

      const result = await eventService.deleteEvent(id, club_id);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      console.error("Error in deleteEvent controller:", error);
      return res
        .status(
          error.message.includes("not found") ||
            error.message.includes("unauthorized")
            ? 404
            : 500
        )
        .json({
          success: false,
          message: error.message || "Failed to delete event",
        });
    }
  }

  async searchEvents(req: Request, res: Response) {
    try {
      const { q, category } = req.query;

      if (!q) {
        return res.status(400).json({
          success: false,
          message: "Search term is required",
        });
      }

      const events = await eventService.searchEvents(
        q as string,
        category as string
      );

      return res.status(200).json({
        success: true,
        message: "Search results fetched successfully",
        data: events,
      });
    } catch (error: any) {
      console.error("Error in searchEvents controller:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to search events",
      });
    }
  }
}

export default new EventController();
