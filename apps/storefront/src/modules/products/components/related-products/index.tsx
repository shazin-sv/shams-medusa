import { listProducts } from "@/lib/data/products"
import { getRegion } from "@/lib/data/regions"
import { HttpTypes } from "@medusajs/types"
import Product from "../product-preview"

type RelatedProductsProps = {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export default async function RelatedProducts({
  product,
  countryCode,
}: RelatedProductsProps) {
  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const queryParams: HttpTypes.StoreProductParams & {
    tag_id?: string[]
    collection_id?: string[]
    is_giftcard?: boolean
  } = {}

  if (region?.id) {
    queryParams.region_id = region.id
  }
  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id]
  }
  if (product.tags) {
    queryParams.tag_id = product.tags
      .map((t) => t.id)
      .filter(Boolean) as string[]
  }
  queryParams.is_giftcard = false

  const products = await listProducts({
    queryParams,
    countryCode,
  }).then(({ response }) => {
    return response.products.filter(
      (responseProduct) => responseProduct.id !== product.id
    )
  })

  if (!products.length) {
    return null
  }

  return (
    <section className="section-shell pt-0">
      <div className="surface-card p-6 small:p-8">
        <div className="section-heading mb-6">
          <span className="section-kicker">You may also need</span>
          <h2 className="section-title !text-[clamp(1.8rem,3vw,2.6rem)]">Related products</h2>
          <p className="section-copy">
            Keep shoppers moving with a cleaner set of related recommendations.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4">
          {products.map((item) => (
            <li key={item.id}>
              <Product region={region} product={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
