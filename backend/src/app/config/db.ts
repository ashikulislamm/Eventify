import postgres from "postgres";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Get database URL from environment
const dbUrl = process.env.DB_URL;

if (!dbUrl) {
  throw new Error("DB_URL is not defined in environment variables");
}

// Create PostgreSQL connection
const sql = postgres(dbUrl, {
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  connect_timeout: 30, // Connection timeout in seconds (increased for network latency)
  ssl: "require", // Required for Supabase
  transform: {
    undefined: null,
  },
});

// Test database connection
export const testConnection = async () => {
  try {
    console.log("🔄 Attempting to connect to database...");
    const result =
      await sql`SELECT NOW() as current_time, version() as db_version`;
    console.log("✅ Database connected successfully!");
    console.log("📅 Server time:", result[0].current_time);
    console.log(
      "🗄️  PostgreSQL version:",
      result[0].db_version.split(" ")[0],
      result[0].db_version.split(" ")[1]
    );
    return true;
  } catch (error: any) {
    console.error("❌ Database connection failed!");
    console.error("Error message:", error.message);
    console.error("\n💡 Troubleshooting tips:");
    console.error("1. Check your internet connection");
    console.error("2. Verify Supabase project is active and not paused");
    console.error("3. Confirm DB_URL in .env file is correct");
    console.error("4. Check if firewall is blocking the connection");
    console.error(
      "5. Try accessing your Supabase dashboard to verify the project status\n"
    );
    return false;
  }
};

export default sql;
