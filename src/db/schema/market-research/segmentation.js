import { pgTable, serial, integer, varchar, real } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";

export const segmentation = pgTable("segmentation", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").references(() => keywords.id),
  segmentName: varchar("segment_name", { length: 255 }),
  percentage: real("percentage"),
  salesValue: real("sales_value"),
});
