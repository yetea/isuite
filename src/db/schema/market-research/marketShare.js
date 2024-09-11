import { pgTable, serial, integer, varchar, real } from "drizzle-orm/pg-core";
import { keywords } from "./keywords";
import { regions } from "./regions";
import { industries } from "./industries";
import { dataSources } from "./dataSources";

export const marketShare = pgTable("market_share", {
  id: serial("id").primaryKey(),
  keywordId: integer("keyword_id").references(() => keywords.id),
  regionId: integer("region_id").references(() => regions.id),
  industryId: integer("industry_id").references(() => industries.id),
  dataSourceId: integer("data_source_id").references(() => dataSources.id),
  month: varchar("month", { length: 20 }),
  marketShareValue: real("market_share_value"),
});
