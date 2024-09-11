// app/api/sentiment/overall/route.ts

import { db } from "@/db";
import {
  sentimentAnalysis,
  customerFeedback,
} from "@/db/schema/customer-feedback";
import { NextResponse } from "next/server";

export async function GET(request) {
  const sentiment = await db
    .select({
      overallSentimentScore: sentimentAnalysis.overallSentimentScore,
    })
    .from(sentimentAnalysis);

  const overallSentimentScore = sentiment.length
    ? sentiment.reduce((acc, item) => acc + item.overallSentimentScore, 0) /
      sentiment.length
    : null;

  return NextResponse.json({ overallSentimentScore });
}
