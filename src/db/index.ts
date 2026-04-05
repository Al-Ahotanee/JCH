import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let db: any;
let isConfigured = false;

const connectionString = process.env.DATABASE_URL || "";

if (connectionString) {
  const client = postgres(connectionString, { max: 1 });
  db = drizzle(client, { schema });
  isConfigured = true;
} else {
  db = {
    select: () => ({
      from: () => ({
        where: () => ({
          orderBy: () => ({ limit: () => Promise.resolve([]), groupBy: () => Promise.resolve([]), then: () => Promise.resolve([]) }),
          limit: () => ({ then: () => Promise.resolve([]) }),
          all: () => Promise.resolve([]),
          then: () => Promise.resolve([]),
        }),
        all: () => ({ then: () => Promise.resolve([]) }),
        orderBy: () => ({ then: () => Promise.resolve([]) }),
        leftJoin: () => ({ where: () => ({ then: () => Promise.resolve([]), limit: () => ({ then: () => Promise.resolve([]) }) }) }),
      }),
    }),
    insert: () => ({
      into: () => ({
        values: () => ({ returning: () => Promise.resolve([]) }),
      }),
    }),
    update: () => ({
      set: () => ({
        where: () => ({ returning: () => Promise.resolve([]) }),
      }),
    }),
    delete: () => ({
      where: () => ({ returning: () => Promise.resolve([]) }),
    }),
  };
  isConfigured = false;
}

export { db, isConfigured };
export default db;