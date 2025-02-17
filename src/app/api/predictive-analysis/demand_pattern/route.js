import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  demandPatternPredictions,
} from "@/db/schema/predictive-analysis";
import { eq } from "drizzle-orm";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

 const demandPattern = await db
   .select()
   .from(demandPatternPredictions)
   .where(
     eq(demandPatternPredictions.analysisId, searchParams.get("analysisId"))
   );

  return NextResponse.json({ demandPattern });
}
