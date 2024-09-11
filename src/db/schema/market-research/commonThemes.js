import { pgTable, serial, integer, varchar } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";

export const commonThemes = pgTable("common_themes", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").references(() => keywords.id),
  theme: varchar("theme", { length: 255 }),
  occurrences: integer("occurrences"),
});
