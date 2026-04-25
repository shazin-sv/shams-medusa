import { config } from "dotenv"

config()

type ProductRecord = {
  id: string
  title: string
  handle: string
  subtitle?: string | null
  description?: string | null
  thumbnail?: string | null
  tags: string[]
}

async function main() {
  const backendUrl = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
  const publishableKey = process.env.MEILI_SYNC_PUBLISHABLE_KEY || process.env.PUBLISHABLE_KEY || ""
  const meiliHost = process.env.MEILISEARCH_HOST
  const meiliKey = process.env.MEILISEARCH_API_KEY
  const indexUid = process.env.MEILISEARCH_PRODUCTS_INDEX || "products"

  if (!meiliHost) {
    throw new Error("MEILISEARCH_HOST is required")
  }

  const productsResponse = await fetch(`${backendUrl.replace(/\/$/, "")}/store/products?limit=100&fields=*tags`, {
    headers: publishableKey
      ? {
          "x-publishable-api-key": publishableKey,
        }
      : undefined,
  })

  if (!productsResponse.ok) {
    throw new Error(`Failed to fetch products from Medusa: ${productsResponse.status}`)
  }

  const payload = await productsResponse.json()
  const products = (payload.products || []) as any[]

  const documents: ProductRecord[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    handle: product.handle,
    subtitle: product.subtitle || null,
    description: product.description || null,
    thumbnail: product.thumbnail || null,
    tags: (product.tags || []).map((tag: any) => tag.value || tag.id).filter(Boolean),
  }))

  const base = meiliHost.replace(/\/$/, "")

  await fetch(`${base}/indexes/${indexUid}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(meiliKey ? { Authorization: `Bearer ${meiliKey}` } : {}),
    },
    body: JSON.stringify({ primaryKey: "id", uid: indexUid }),
  }).catch(() => null)

  const settingsResponse = await fetch(`${base}/indexes/${indexUid}/settings/searchable-attributes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(meiliKey ? { Authorization: `Bearer ${meiliKey}` } : {}),
    },
    body: JSON.stringify(["title", "subtitle", "description", "handle", "tags"]),
  })

  if (!settingsResponse.ok) {
    throw new Error(`Failed to configure Meili settings: ${settingsResponse.status}`)
  }

  const documentsResponse = await fetch(`${base}/indexes/${indexUid}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(meiliKey ? { Authorization: `Bearer ${meiliKey}` } : {}),
    },
    body: JSON.stringify(documents),
  })

  if (!documentsResponse.ok) {
    throw new Error(`Failed to sync documents to Meili: ${documentsResponse.status}`)
  }

  const result = await documentsResponse.json()
  console.log(`Synced ${documents.length} products to MeiliSearch index \"${indexUid}\"`)
  console.log(result)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
