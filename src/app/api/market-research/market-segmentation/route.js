import { db } from "@/db";
import { segmentation } from "@/db/schema/market-research/segmentation";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const rawData = await db
      .select()
      .from(segmentation)
      .where(eq(segmentation.keywordId, searchParams.get("keywordId")));
    const data = rawData.map((item) => ({
      type: item.segmentName, // x-axis
      value: item.percentage, // y-axis
    }));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
