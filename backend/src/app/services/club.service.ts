import sql from "../config/db";
import bcrypt from "bcrypt";

interface CreateClubData {
  clubName: string;
  email: string;
  phone: string;
  university: string;
  description: string;
  presidentName: string;
  presidentEmail: string;
  password: string;
}

interface Club {
  id: string;
  club_name: string;
  email: string;
  phone: string;
  university: string;
  description: string;
  president_name: string;
  president_email: string;
  logo: string | null;
  website: string | null;
  address: string | null;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
}

class ClubService {
  // Create a new club
  async createClub(clubData: CreateClubData): Promise<Omit<Club, "password">> {
    const {
      clubName,
      email,
      phone,
      university,
      description,
      presidentName,
      presidentEmail,
      password,
    } = clubData;

    // Check if club already exists
    const existingClub = await sql<Club[]>`
      SELECT email FROM clubs WHERE email = ${email}
    `;

    if (existingClub.length > 0) {
      throw new Error("Club with this email already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the club
    const newClub = await sql<Club[]>`
      INSERT INTO clubs (club_name, email, phone, university, description, president_name, president_email, password)
      VALUES (${clubName}, ${email}, ${phone}, ${university}, ${description}, ${presidentName}, ${presidentEmail}, ${hashedPassword})
      RETURNING id, club_name, email, phone, university, description, president_name, president_email, logo, website, address, is_verified, created_at, updated_at
    `;

    return newClub[0];
  }

  // Get club by ID
  async getClubById(id: string): Promise<Omit<Club, "password"> | null> {
    const club = await sql<Club[]>`
      SELECT id, club_name, email, phone, university, description, president_name, president_email, logo, website, address, is_verified, created_at, updated_at
      FROM clubs
      WHERE id = ${id}
    `;

    return club.length > 0 ? club[0] : null;
  }

  // Get club by email
  async getClubByEmail(email: string): Promise<Club | null> {
    const club = await sql<Club[]>`
      SELECT * FROM clubs WHERE email = ${email}
    `;

    return club.length > 0 ? club[0] : null;
  }

  // Get all clubs (with pagination)
  async getAllClubs(limit: number = 10, offset: number = 0) {
    const clubs = await sql<Club[]>`
      SELECT id, club_name, email, phone, university, description, president_name, president_email, logo, website, address, is_verified, created_at, updated_at
      FROM clubs
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countResult = await sql<[{ count: string }]>`
      SELECT COUNT(*) as count FROM clubs
    `;

    return {
      clubs,
      total: parseInt(countResult[0].count),
      limit,
      offset,
    };
  }

  // Update club
  async updateClub(
    id: string,
    updateData: Partial<CreateClubData>
  ): Promise<Omit<Club, "password"> | null> {
    const allowedFields = [
      "club_name",
      "phone",
      "university",
      "description",
      "president_name",
      "president_email",
      "logo",
      "website",
      "address",
    ];
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(updateData).forEach(([key, value]) => {
      // Convert camelCase to snake_case
      const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
      if (allowedFields.includes(snakeKey) && value !== undefined) {
        updates.push(`${snakeKey} = $${values.length + 1}`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      throw new Error("No valid fields to update");
    }

    values.push(id);
    const query = `
      UPDATE clubs 
      SET ${updates.join(", ")}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${values.length}
      RETURNING id, club_name, email, phone, university, description, president_name, president_email, logo, website, address, is_verified, created_at, updated_at
    `;

    const updatedClub = await sql.unsafe<Club[]>(query, values);
    return updatedClub.length > 0 ? updatedClub[0] : null;
  }

  // Delete club
  async deleteClub(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM clubs WHERE id = ${id}
      RETURNING id
    `;

    return result.length > 0;
  }

  // Verify password
  async verifyPassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new ClubService();
