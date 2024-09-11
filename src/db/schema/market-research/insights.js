import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";

export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").references(() => keywords.id),
  insight: text("insight"),
});
