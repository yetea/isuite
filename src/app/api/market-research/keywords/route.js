import { db } from "@/db";
import { keywords } from "@/db/schema/market-research/keywords";

export async function GET(req) {
  try {
    const data = await db.select().from(keywords);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching keywords" }), {
      status: 500,
    });
  }
}
