// app/api/feedback/recent/route.ts

import { db } from "@/db";
import { customerFeedback } from "@/db/schema/customer-feedback";
import { NextResponse } from "next/server";

export async function GET() {
  const feedback = await db
    .select()
    .from(customerFeedback)
    .orderBy(customerFeedback.submittedAt, "desc")
    .limit(6);

  return NextResponse.json(feedback);
}
