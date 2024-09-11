import { db } from "@/db";
import { trends } from "@/db/schema/market-research/trends";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const data = await db
      .select()
      .from(trends)
      .where(eq(trends.keywordId, searchParams.get("keywordId")));

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
