import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

// Customer Feedback Table
export const customerFeedback = pgTable("customer_feedback", {
  id: serial("id").primaryKey(),
  feedbackText: text("feedback_text"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  keyword: text("keyword"),
  sentimentScore: decimal("sentiment_score", { precision: 5, scale: 2 }),
  source: text("source"),
});

// Sentiment Analysis Table
export const sentimentAnalysis = pgTable("sentiment_analysis", {
  id: serial("id").primaryKey(),
  feedbackId: integer("feedback_id").references(() => customerFeedback.id),
  overallSentimentScore: decimal("overall_sentiment_score", {
    precision: 5,
    scale: 2,
  }),
  positiveScore: decimal("positive_score", { precision: 5, scale: 2 }),
  negativeScore: decimal("negative_score", { precision: 5, scale: 2 }),
  neutralScore: decimal("neutral_score", { precision: 5, scale: 2 }),
  analyzedAt: timestamp("analyzed_at").defaultNow(),
});

// Sentiment Trends Table
export const sentimentTrends = pgTable("sentiment_trends", {
  id: serial("id").primaryKey(),
  keyword: text("keyword"),
  year: integer("year"),
  totalFeedback: integer("total_feedback"),
  averageSentimentScore: decimal("average_sentiment_score", {
    precision: 5,
    scale: 2,
  }),
  positiveFeedbackPercentage: decimal("positive_feedback_percentage", {
    precision: 5,
    scale: 2,
  }),
  negativeFeedbackPercentage: decimal("negative_feedback_percentage", {
    precision: 5,
    scale: 2,
  }),
  neutralFeedbackPercentage: decimal("neutral_feedback_percentage", {
    precision: 5,
    scale: 2,
  }),
});

// Key Themes Table
export const keyThemes = pgTable("key_themes", {
  id: serial("id").primaryKey(),
  feedbackId: integer("feedback_id").references(() => customerFeedback.id),
  theme: text("theme"),
  frequency: integer("frequency"),
  importanceScore: decimal("importance_score", { precision: 5, scale: 2 }),
});
