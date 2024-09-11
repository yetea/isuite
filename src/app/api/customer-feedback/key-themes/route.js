import { db } from "@/db";
import { keyThemes } from "@/db/schema/customer-feedback";
import { NextResponse } from "next/server";

export async function GET(request) {
  const themes = await db.select().from(keyThemes);

  return NextResponse.json(themes);
}
