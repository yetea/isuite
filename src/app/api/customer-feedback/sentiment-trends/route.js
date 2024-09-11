import { db } from "@/db";
import { sentimentTrends } from "@/db/schema/customer-feedback";
import { NextResponse } from "next/server";

export async function GET(request) {
  const rawData = await db.select().from(sentimentTrends);

  const trends = rawData.map((item) => ({
    year: item.year, // x-axis
    category: item.keyword,
    value: parseFloat(item.averageSentimentScore), // y-axis
  }));

  return NextResponse.json(trends);
}
