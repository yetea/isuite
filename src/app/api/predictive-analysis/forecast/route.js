import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  demandPatternPredictions,
  consumerBehaviorInsights,
  salesForecast,
  customerAdoption,
  revenueProjections,
} from "@/db/schema/predictive-analysis";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  try {
    const demandPattern = await db
      .select()
      .from(demandPatternPredictions)
      .where(
        eq(demandPatternPredictions.analysisId, searchParams.get("analysisId"))
      );

    const behaviorInsight = await db
      .select()
      .from(consumerBehaviorInsights)
      .where(
        eq(consumerBehaviorInsights.analysisId, searchParams.get("analysisId"))
      );
    // Fetch data from customer adoptions
    const customerAdoptions = await db
      .select()
      .from(customerAdoption) // Replace with your  reference
      .where(eq(customerAdoption.analysisId, searchParams.get("analysisId")));

    // Fetch data from revenue projections
    const revenueProjection = await db
      .select()
      .from(revenueProjections) // Replace with your  reference
      .where(eq(revenueProjections.analysisId, searchParams.get("analysisId")));

    // Fetch data from sales forecasts
    const salesForecasts = await db
      .select()
      .from(salesForecast) // Replace with your  reference
      .where(eq(salesForecast.analysisId, searchParams.get("analysisId")));

    return NextResponse.json({
      demandPattern,
      behaviorInsight,
      customerAdoptions,
      revenueProjection,
      salesForecasts,
    });
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}
