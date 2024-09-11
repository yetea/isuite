import { db } from "@/db";
import { regions } from "@/db/schema/market-research/regions";

export async function GET(req) {
  try {
    const data = await db.select().from(regions);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching regions" }), {
      status: 500,
    });
  }
}
