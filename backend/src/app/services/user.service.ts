import sql from "../config/db";
import bcrypt from "bcrypt";

interface CreateUserData {
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  is_verified: boolean;
  avatar: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}

class UserService {
  // Create a new user (Student Registration)
  async createUser(userData: CreateUserData): Promise<Omit<User, "password">> {
    const { name, email, phone, address, university, department, password } = userData;

    // Check if user already exists
    const existingUser = await sql<User[]>`
      SELECT email FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      throw new Error("User with this email already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user
    const newUser = await sql<User[]>`
      INSERT INTO users (name, email, phone, address, university, department, password)
      VALUES (${name}, ${email}, ${phone}, ${address}, ${university}, ${department}, ${hashedPassword})
      RETURNING id, name, email, phone, address, university, department, is_verified, avatar, bio, created_at, updated_at
    `;

    return newUser[0];
  }

  // Get user by ID
  async getUserById(id: string): Promise<Omit<User, "password"> | null> {
    const user = await sql<User[]>`
      SELECT id, name, email, phone, address, university, department, is_verified, avatar, bio, created_at, updated_at
      FROM users
      WHERE id = ${id}
    `;

    return user.length > 0 ? user[0] : null;
  }

  // Get user by email
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await sql<User[]>`
      SELECT * FROM users WHERE email = ${email}
    `;

    return user.length > 0 ? user[0] : null;
  }

  // Get all users (with pagination)
  async getAllUsers(limit: number = 10, offset: number = 0) {
    const users = await sql<User[]>`
      SELECT id, name, email, phone, address, university, department, is_verified, avatar, bio, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    const countResult = await sql<[{ count: string }]>`
      SELECT COUNT(*) as count FROM users
    `;

    return {
      users,
      total: parseInt(countResult[0].count),
      limit,
      offset,
    };
  }

  // Update user
  async updateUser(id: string, updateData: Partial<CreateUserData>): Promise<Omit<User, "password"> | null> {
    const allowedFields = ["name", "phone", "address", "university", "department", "avatar", "bio"];
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(updateData).forEach(([key, value]) => {
      if (allowedFields.includes(key) && value !== undefined) {
        updates.push(`${key} = $${values.length + 1}`);
        values.push(value);
      }
    });

    if (updates.length === 0) {
      throw new Error("No valid fields to update");
    }

    values.push(id);
    const query = `
      UPDATE users 
      SET ${updates.join(", ")}
      WHERE id = $${values.length}
      RETURNING id, name, email, phone, address, university, department, is_verified, avatar, bio, created_at, updated_at
    `;

    const updatedUser = await sql.unsafe<User[]>(query, values);
    return updatedUser.length > 0 ? updatedUser[0] : null;
  }

  // Delete user
  async deleteUser(id: string): Promise<boolean> {
    const result = await sql`
      DELETE FROM users WHERE id = ${id}
      RETURNING id
    `;

    return result.length > 0;
  }

  // Verify password
  async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default new UserService();
