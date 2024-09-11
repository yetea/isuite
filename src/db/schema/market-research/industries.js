import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const industries = pgTable("industries", {
  id: serial("id").primaryKey(),
  industryName: varchar("industry_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
