import {
  pgTable,
  serial,
  text,
  integer,
  decimal,
  timestamp,
  date,
  varchar
} from "drizzle-orm/pg-core";

// Analysis Table
export const analysis = pgTable("analysis", {
  id: serial("id").primaryKey(),
  keyword: text("keyword").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  description: text("description"),
});

// Uploads Table
export const uploads = pgTable("uploads", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  path: text("path").notNull(),
  uploadDate: timestamp("upload_date").defaultNow().notNull(),
  fileType: text("file_type"),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
});

// Sales Forecast Table
export const salesForecast = pgTable("sales_forecast", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
  date: date("date").defaultNow().notNull(), // The date of the data
  category: varchar("category", { length: 255 }).notNull(), // Metric type: "Traffic" or "Payments"
  value: integer("value").notNull(), // Numeric value for the category
});


// Customer Adoption Table
export const customerAdoption = pgTable("customer_adoption", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
  year: integer("year").notNull(),
  adoptionRate: decimal("adoption_rate", 5, 2).notNull(), // Decimal with precision
});

// Revenue Projections Table
export const revenueProjections = pgTable("revenue_projections", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
  category: text("category").notNull(),
  month: text("month").notNull(),
  value: decimal("value", 10, 2).notNull(), // Revenue value with precision
});

// Demand Pattern Predictions Table
export const demandPatternPredictions = pgTable("demand_pattern_predictions", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
  taskName: text("task_name").notNull(),
  date: date("date").defaultNow().notNull(),
  status: text("status").notNull(),
});

// Consumer Behavior Insights Table
export const consumerBehaviorInsights = pgTable("consumer_behavior_insights", {
  id: serial("id").primaryKey(),
  analysisId: integer("analysis_id").references(() => analysis.id), // Foreign key to Analysis
  insightText: text("insight_text").notNull(),
});
