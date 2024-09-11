import { db } from "@/db";
import { industries } from "@/db/schema/market-research/industries";

export async function GET(req) {
  try {
    const data = await db.select().from(industries);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching industries" }),
      { status: 500 }
    );
  }
}
