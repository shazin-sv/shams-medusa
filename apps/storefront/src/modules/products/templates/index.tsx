import { HttpTypes } from "@medusajs/types"
import ImageGallery from "@/modules/products/components/image-gallery"
import ProductActions from "@/modules/products/components/product-actions"
import ProductTabs from "@/modules/products/components/product-tabs"
import RelatedProducts from "@/modules/products/components/related-products"
import ProductInfo from "@/modules/products/templates/product-info"
import SkeletonRelatedProducts from "@/modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import React, { Suspense } from "react"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductFacts from "../components/product-facts"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="bg-slate-50 py-8 small:py-10">
      <div className="content-container flex flex-col gap-y-6" data-testid="product-container">
        <div className="grid grid-cols-1 gap-6 large:grid-cols-[0.95fr_1.05fr]">
          <ImageGallery product={product} />
          <div className="surface-card flex flex-col gap-6 p-6 small:p-8">
            <ProductInfo product={product} />
            <Suspense fallback={<ProductActions product={product} region={region} />}>
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
            <ProductFacts product={product} />
          </div>
        </div>

        <ProductTabs product={product} />

        <div data-testid="related-products-container">
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductTemplate
