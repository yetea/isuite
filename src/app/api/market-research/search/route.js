import { db } from "@/db";
import { marketShare } from "@/db/schema/market-research/marketShare";

export async function GET(req) {
  // Extract the query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("keyword");
  const region = searchParams.get("region");
  const industry = searchParams.get("industry");
  const dataSource = searchParams.get("dataSource");

  try {
    // Build the query dynamically based on the provided filters
    let query = db.select().from(marketShare);

    if (keyword) {
      const keywordEntry = await db
        .select()
        .from(keywords)
        .where(keywords.keyword.equals(keyword)) // Assuming `keyword` is the field in the keywords table
        .first(); // Get the first matching keyword

      if (!keywordEntry) {
        return new Response(JSON.stringify({ error: "Keyword not found" }), {
          status: 404,
        });
      }

      query = query.where(marketShare.keywordId.equals(keywordEntry.id));
    }

    if (region) {
      query = query.where(marketShare.regionId.equals(Number(region)));
    }

    if (industry) {
      query = query.where(marketShare.industryId.equals(Number(industry)));
    }

    if (dataSource) {
      query = query.where(marketShare.dataSourceId.equals(Number(dataSource)));
    }

    // Fetch the data from the database
    const data = await query;
    // Return the data as a JSON response
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching search results" }),
      { status: 404 }
    );
  }
}
