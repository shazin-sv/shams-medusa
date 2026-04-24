import { listProductsWithSort } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import ProductPreview from "@/modules/products/components/product-preview"
import { Pagination } from "@/modules/store/components/pagination"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"
import { B2BCustomer } from "@/types"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  customer_group_id?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  productsIds,
  countryCode,
  customer,
  query,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  productsIds?: string[]
  countryCode: string
  customer?: B2BCustomer | null
  query?: string
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (query) {
    queryParams["q"] = query
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-500">
        <span>{count} products available{query ? ` for "${query}"` : ""}</span>
        <span>{customer ? "Personalized pricing ready" : "Sign in for account features"}</span>
      </div>

      <ul
        className="grid grid-cols-1 gap-5 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4"
        data-testid="products-list"
      >
        {products.length > 0 ? (
          products.map((p) => {
            return (
              <li key={p.id}>
                <ProductPreview product={p} region={region} />
              </li>
            )
          })
        ) : (
          <li className="col-span-full">
            <div className="surface-card py-16 text-center">
              <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-slate-950">
                No products found
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                Try a different category or sorting option to explore more items.
              </p>
            </div>
          </li>
        )}
      </ul>

      {totalPages > 1 && (
        <div className="flex justify-center pt-4">
          <Pagination
            data-testid="product-pagination"
            page={page}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  )
}
