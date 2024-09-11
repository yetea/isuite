import { db } from "@/db";
import { commonThemes } from "@/db/schema/market-research/commonThemes";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  try {
    const rawData = await db
      .select()
      .from(commonThemes)
      .where(eq(commonThemes.keywordId, searchParams.get("keywordId")));
    const data = rawData.map((item) => ({
      text: item.theme, // x-axis
      name: item.theme,
      value: item.occurrences, // y-axis
    }));
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
