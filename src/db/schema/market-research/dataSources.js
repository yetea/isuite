import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const dataSources = pgTable("data_sources", {
  id: serial("id").primaryKey(),
  sourceName: varchar("source_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
