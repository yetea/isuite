import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(),
  keyword: varchar("keyword", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
