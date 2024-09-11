import { pgTable, serial, integer, real, varchar } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";

export const trends = pgTable("trends", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").references(() => keywords.id),
  year: varchar("year", { length: 4 }), // Using varchar since `year` is not a native type in PostgreSQL
  value: real("value"),
});
