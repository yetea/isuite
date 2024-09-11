import { pgTable, serial, varchar, timestamp } from "drizzle-orm/pg-core";

export const regions = pgTable("regions", {
  id: serial("id").primaryKey(),
  regionName: varchar("region_name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow(),
});
