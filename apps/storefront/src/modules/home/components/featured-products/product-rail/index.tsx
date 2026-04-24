import { getProductsById } from "@/lib/data/products"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ProductPreview from "@/modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const { products } = collection

  if (!products) {
    return null
  }

  const productsWithPrices = await getProductsById({
    ids: products.map((p) => p.id!),
    regionId: region.id,
  })

  return (
    <section className="bg-slate-50 py-6">
      <div className="content-container">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
              Collection
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-[-0.04em] text-slate-950">
              {collection.title}
            </h3>
          </div>
          <LocalizedClientLink href={`/collections/${collection.handle}`} className="btn-ghost hidden small:inline-flex">
            View all
          </LocalizedClientLink>
        </div>

        <ul className="grid grid-cols-1 gap-5 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4">
          {productsWithPrices &&
            productsWithPrices.slice(0, 4).map((product) => (
              <li key={product.id}>
                <ProductPreview product={product} region={region} isFeatured />
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
