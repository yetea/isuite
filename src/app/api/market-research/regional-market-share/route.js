import { db } from "@/db";
import { marketShare } from "@/db/schema/market-research/marketShare";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await db
      .select()
      .from(marketShare)
      .where(
        and(
          eq(marketShare.keywordId, searchParams.get("keywordId")),
          eq(marketShare.regionId, searchParams.get("regionId"))
        )
      );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
