import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { z } from "zod";

const SearchQuery = z.object({
  q: z.string().trim().min(1),
  limit: z.coerce.number().int().min(1).max(20).optional().default(8),
});

type SearchHit = {
  id: string;
  title: string;
  handle: string;
  subtitle?: string | null;
  description?: string | null;
  thumbnail?: string | null;
  tags?: string[];
};

async function searchMeili(query: string, limit: number): Promise<SearchHit[]> {
  const host = process.env.MEILISEARCH_HOST;
  const apiKey = process.env.MEILISEARCH_API_KEY;
  const indexUid = process.env.MEILISEARCH_PRODUCTS_INDEX || "products";

  if (!host) {
    return [];
  }

  const response = await fetch(`${host.replace(/\/$/, "")}/indexes/${indexUid}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    },
    body: JSON.stringify({
      q: query,
      limit,
      attributesToHighlight: ["title", "subtitle"],
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Meili search failed with status ${response.status}`);
  }

  const data = await response.json();
  return (data.hits || []) as SearchHit[];
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const parsed = SearchQuery.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid search query",
      errors: parsed.error.flatten(),
    });
  }

  const { q, limit } = parsed.data;

  try {
    const hits = await searchMeili(q, limit);

    return res.json({
      hits,
      count: hits.length,
      query: q,
    });
  } catch (error: any) {
    return res.status(503).json({
      message: "Search service unavailable",
      query: q,
      hits: [],
      count: 0,
      error: error?.message || "Unknown search error",
    });
  }
};
