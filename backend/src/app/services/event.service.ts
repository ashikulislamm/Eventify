import sql from "../config/db";

interface EventData {
  title: string;
  description: string;
  category: string;
  venue: string;
  address: string;
  city: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  max_attendees?: number;
  price: number;
  is_paid: boolean;
  image?: string;
  tags?: string[];
  highlights?: string[];
  requirements?: string[];
  club_id: string;
}

class EventService {
  async createEvent(eventData: EventData) {
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
      } = eventData;

      const result = await sql`
        INSERT INTO events (
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
          club_id
        ) VALUES (
          ${title},
          ${description},
          ${category},
          ${venue},
          ${address},
          ${city},
          ${start_date},
          ${end_date},
          ${start_time},
          ${end_time},
          ${max_attendees || null},
          ${price},
          ${is_paid},
          ${image || null},
          ${tags || []},
          ${highlights || []},
          ${requirements || []},
          ${club_id}
        )
        RETURNING *
      `;

      return result[0];
    } catch (error: any) {
      console.error("Error creating event:", error);
      throw new Error(error.message || "Failed to create event");
    }
  }

  async getAllEvents(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;

      const events = await sql`
        SELECT 
          e.*,
          c.club_name,
          c.nickname as club_nickname,
          c.logo as club_logo,
          0 as registered_count
        FROM events e
        LEFT JOIN clubs c ON e.club_id = c.id
        ORDER BY e.created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;

      const countResult = await sql`
        SELECT COUNT(*)::INTEGER as total
        FROM events
      `;

      return {
        events,
        total: countResult[0].total,
        page,
        totalPages: Math.ceil(countResult[0].total / limit),
      };
    } catch (error: any) {
      console.error("Error fetching events:", error);
      throw new Error(error.message || "Failed to fetch events");
    }
  }

  async getEventById(eventId: string) {
    try {
      const result = await sql`
        SELECT 
          e.*,
          c.club_name,
          c.nickname as club_nickname,
          c.logo as club_logo,
          c.email as club_email,
          c.phone as club_phone,
          c.website as club_website,
          c.description as club_description,
          c.created_at as club_created_at,
          0 as registered_count
        FROM events e
        LEFT JOIN clubs c ON e.club_id = c.id
        WHERE e.id = ${eventId}
      `;

      if (result.length === 0) {
        throw new Error("Event not found");
      }

      return result[0];
    } catch (error: any) {
      console.error("Error fetching event:", error);
      throw new Error(error.message || "Failed to fetch event");
    }
  }

  async getEventBySlug(slug: string) {
    try {
      console.log("Looking for event with slug:", slug);
      
      // First, let's fetch all events and manually generate slugs to debug
      const allEvents = await sql`SELECT id, title FROM events`;
      console.log("All events in database:");
      allEvents.forEach(event => {
        const generatedSlug = event.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim();
        console.log(`  - "${event.title}" -> "${generatedSlug}" (match: ${generatedSlug === slug})`);
      });

      // Use the proper PostgreSQL regex syntax that matches frontend logic
      const result = await sql`
        SELECT 
          e.*,
          c.club_name,
          c.nickname as club_nickname,
          c.logo as club_logo,
          c.email as club_email,
          c.phone as club_phone,
          c.website as club_website,
          c.description as club_description,
          c.created_at as club_created_at,
          0 as registered_count
        FROM events e
        LEFT JOIN clubs c ON e.club_id = c.id
        WHERE TRIM(BOTH '-' FROM 
          REGEXP_REPLACE(
            REGEXP_REPLACE(
              LOWER(REGEXP_REPLACE(e.title, '[^a-zA-Z0-9 -]', '', 'g')),
              ' +', '-', 'g'
            ),
            '-+', '-', 'g'
          )
        ) = ${slug.toLowerCase()}
        LIMIT 1
      `;

      console.log("Query result:", result.length > 0 ? "Found" : "Not found");

      if (result.length === 0) {
        throw new Error("Event not found");
      }

      return result[0];
    } catch (error: any) {
      console.error("Error fetching event by slug:", error);
      throw new Error(error.message || "Failed to fetch event");
    }
  }

  async getEventsByClubId(clubId: string) {
    try {
      const events = await sql`
        SELECT 
          e.*,
          0 as registered_count
        FROM events e
        WHERE e.club_id = ${clubId}
        ORDER BY e.start_date DESC, e.start_time DESC
      `;

      return events;
    } catch (error: any) {
      console.error("Error fetching club events:", error);
      throw new Error(error.message || "Failed to fetch club events");
    }
  }

  async updateEvent(
    eventId: string,
    eventData: Partial<EventData>,
    clubId: string
  ) {
    try {
      // Verify the event belongs to the club
      const verifyResult = await sql`
        SELECT id FROM events WHERE id = ${eventId} AND club_id = ${clubId}
      `;

      if (verifyResult.length === 0) {
        throw new Error("Event not found or unauthorized");
      }

      const allowedFields = [
        "title",
        "description",
        "category",
        "venue",
        "address",
        "city",
        "start_date",
        "end_date",
        "start_time",
        "end_time",
        "max_attendees",
        "price",
        "is_paid",
        "image",
        "tags",
        "highlights",
        "requirements",
      ];

      const updates: any = {};
      Object.keys(eventData).forEach((key) => {
        if (allowedFields.includes(key)) {
          updates[key] = (eventData as any)[key];
        }
      });

      if (Object.keys(updates).length === 0) {
        throw new Error("No valid fields to update");
      }

      // Build dynamic update using COALESCE to only update provided fields
      const result = await sql`
        UPDATE events
        SET 
          title = COALESCE(${updates.title || null}, title),
          description = COALESCE(${updates.description || null}, description),
          category = COALESCE(${updates.category || null}, category),
          venue = COALESCE(${updates.venue || null}, venue),
          address = COALESCE(${updates.address || null}, address),
          city = COALESCE(${updates.city || null}, city),
          start_date = COALESCE(${updates.start_date || null}, start_date),
          end_date = COALESCE(${updates.end_date || null}, end_date),
          start_time = COALESCE(${updates.start_time || null}, start_time),
          end_time = COALESCE(${updates.end_time || null}, end_time),
          max_attendees = COALESCE(${
            updates.max_attendees || null
          }, max_attendees),
          price = COALESCE(${
            updates.price !== undefined ? updates.price : null
          }, price),
          is_paid = COALESCE(${
            updates.is_paid !== undefined ? updates.is_paid : null
          }, is_paid),
          image = COALESCE(${updates.image || null}, image),
          tags = COALESCE(${updates.tags || null}, tags),
          highlights = COALESCE(${updates.highlights || null}, highlights),
          requirements = COALESCE(${
            updates.requirements || null
          }, requirements),
          updated_at = NOW()
        WHERE id = ${eventId}
        RETURNING *
      `;

      return result[0];
    } catch (error: any) {
      console.error("Error updating event:", error);
      throw new Error(error.message || "Failed to update event");
    }
  }

  async deleteEvent(eventId: string, clubId: string) {
    try {
      // Verify the event belongs to the club
      const verifyResult = await sql`
        SELECT id FROM events WHERE id = ${eventId} AND club_id = ${clubId}
      `;

      if (verifyResult.length === 0) {
        throw new Error("Event not found or unauthorized");
      }

      // Delete the event
      await sql`
        DELETE FROM events
        WHERE id = ${eventId}
      `;

      return { message: "Event deleted successfully" };
    } catch (error: any) {
      console.error("Error deleting event:", error);
      throw new Error(error.message || "Failed to delete event");
    }
  }

  async searchEvents(searchTerm: string, category?: string) {
    try {
      let events;

      if (category) {
        events = await sql`
          SELECT 
            e.*,
            c.club_name,
            c.nickname as club_nickname,
            c.logo as club_logo,
            0 as registered_count
          FROM events e
          LEFT JOIN clubs c ON e.club_id = c.id
          WHERE e.category = ${category}
            AND (
              e.title ILIKE ${"% " + searchTerm + "%"}
              OR e.description ILIKE ${"%" + searchTerm + "%"}
              OR e.city ILIKE ${"%" + searchTerm + "%"}
            )
          ORDER BY e.start_date ASC, e.start_time ASC
        `;
      } else {
        events = await sql`
          SELECT 
            e.*,
            c.club_name,
            c.nickname as club_nickname,
            c.logo as club_logo,
            0 as registered_count
          FROM events e
          LEFT JOIN clubs c ON e.club_id = c.id
          WHERE (
              e.title ILIKE ${"% " + searchTerm + "%"}
              OR e.description ILIKE ${"%" + searchTerm + "%"}
              OR e.city ILIKE ${"%" + searchTerm + "%"}
              OR e.category ILIKE ${"%" + searchTerm + "%"}
            )
          ORDER BY e.start_date ASC, e.start_time ASC
        `;
      }

      return events;
    } catch (error: any) {
      console.error("Error searching events:", error);
      throw new Error(error.message || "Failed to search events");
    }
  }
}

export default new EventService();
