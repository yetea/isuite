import { db } from "@/db";
import { dataSources } from "@/db/schema/market-research/dataSources";

export async function GET(req) {
  try {
    const data = await db.select().from(dataSources);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching data sources" }),
      { status: 500 }
    );
  }
}
