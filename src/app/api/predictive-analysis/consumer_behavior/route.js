import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  demandPatternPredictions,
  consumerBehaviorInsights,
} from "@/db/schema/predictive-analysis";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const behaviorInsight = await db
    .select()
    .from(consumerBehaviorInsights)
    .where(
      eq(consumerBehaviorInsights.analysisId, searchParams.get("analysisId"))
    );

  return NextResponse.json({ behaviorInsight });
}
