import sql from "../config/db";
import bcrypt from "bcrypt";
import userService from "./user.service";

interface LoginCredentials {
  email: string;
  password: string;
}

interface UserWithPassword {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  role: string;
  password: string;
  is_verified: boolean;
  avatar: string | null;
  bio: string | null;
  created_at: Date;
  updated_at: Date;
}

interface LoginResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  university: string;
  department: string;
  role: string;
  is_verified: boolean;
  avatar: string | null;
  bio: string | null;
}

class AuthService {
  // Student Login
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const { email, password } = credentials;

    // Get user by email (includes password)
    const user = (await userService.getUserByEmail(
      email
    )) as UserWithPassword | null;

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify password
    const isPasswordValid = await userService.verifyPassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // Return user data without password
    const {
      password: _,
      created_at,
      updated_at,
      ...userWithoutPassword
    } = user;
    return userWithoutPassword;
  }

  // Change Password
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    const user = await sql`
      SELECT password FROM users WHERE id = ${userId}
    `;

    if (user.length === 0) {
      throw new Error("User not found");
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user[0].password
    );

    if (!isPasswordValid) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}
      WHERE id = ${userId}
    `;
  }

  // Request Password Reset (store token)
  async requestPasswordReset(email: string): Promise<boolean> {
    const user = await userService.getUserByEmail(email);

    if (!user) {
      // Return true even if user doesn't exist (security best practice)
      return true;
    }

    // Here you would generate a reset token and send email
    // For now, we'll just return true
    return true;
  }
}

export default new AuthService();
