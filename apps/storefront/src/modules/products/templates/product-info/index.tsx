import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="w-full">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
        Product details
      </div>
      <div className="mt-3 flex flex-col gap-y-4 w-full">
        <Heading
          level="h1"
          className="text-[2rem] font-extrabold leading-tight tracking-[-0.05em] text-slate-950 small:text-[2.6rem]"
          data-testid="product-title"
        >
          {product.title}
        </Heading>

        {product.subtitle && (
          <Text
            className="text-base leading-7 text-slate-600 whitespace-pre-line small:text-lg"
            data-testid="product-description"
          >
            {product.subtitle}
          </Text>
        )}
      </div>
    </div>
  )
}

export default ProductInfo
