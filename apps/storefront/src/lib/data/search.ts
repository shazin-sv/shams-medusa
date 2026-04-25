"use server"

import { sdk } from "@/lib/config"

export type SearchSuggestion = {
  id: string
  title: string
  handle: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  tags?: string[]
}

export async function searchProducts(query: string, limit = 8) {
  const trimmed = query.trim()

  if (!trimmed) {
    return [] as SearchSuggestion[]
  }

  try {
    const response = await sdk.client.fetch<{
      hits: SearchSuggestion[]
    }>(`/store/search`, {
      method: "GET",
      query: {
        q: trimmed,
        limit,
      },
      cache: "no-store" as any,
    })

    return response.hits || []
  } catch {
    return [] as SearchSuggestion[]
  }
}
