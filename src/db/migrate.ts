import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "./index";

const runMigrations = async () => {
  try {
    console.log("Running database migrations...");
    await migrate(db, { migrationsFolder: "./src/db/migrations" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.log("Migrations skipped or failed:", error instanceof Error ? error.message : "Unknown error");
    console.log("App will use mock data until database is configured");
  }
};

runMigrations();