import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

export default async function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  if (!product) {
    return null
  }

  const { cheapestPrice } = getProductPrice({ product })

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group block h-full">
      <article className="surface-card flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-slate-300">
        <div className="relative aspect-square overflow-hidden bg-slate-100 p-5">
          <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
            {isFeatured ? "Featured" : "Product"}
          </div>
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 text-base font-bold leading-7 text-slate-950 small:text-lg">
            {product.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {product.subtitle || product.description || "Professional product from the Shamstools catalog."}
          </p>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Price
              </div>
              {cheapestPrice && (
                <div className="mt-1 text-lg font-extrabold tracking-[-0.03em] text-slate-950 small:text-xl">
                  <PreviewPrice price={cheapestPrice} />
                </div>
              )}
            </div>
            <div className="rounded-full border border-slate-200 px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-700 transition group-hover:border-slate-900 group-hover:text-slate-950">
              View
            </div>
          </div>
        </div>
      </article>
    </LocalizedClientLink>
  )
}
