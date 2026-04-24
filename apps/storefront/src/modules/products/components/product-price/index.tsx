import { clx, Text } from "@medusajs/ui"
import { getProductPrice } from "@/lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
}: {
  product: HttpTypes.StoreProduct
}) {
  const { cheapestPrice } = getProductPrice({
    product,
  })

  if (!cheapestPrice) {
    return <div className="block h-10 w-32 animate-pulse rounded-xl bg-gray-100" />
  }

  return (
    <div className="flex flex-col text-slate-950">
      <span
        className={clx({
          "text-ui-fg-interactive": cheapestPrice.price_type === "sale",
        })}
      >
        <Text
          className="text-3xl font-extrabold tracking-[-0.04em]"
          data-testid="product-price"
          data-value={cheapestPrice.calculated_price_number}
        >
          From {cheapestPrice.calculated_price}
        </Text>
        <Text className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Excl. VAT
        </Text>
      </span>
      {cheapestPrice.price_type === "sale" && (
        <p
          className="mt-2 text-sm text-slate-400 line-through"
          data-testid="original-product-price"
          data-value={cheapestPrice.original_price_number}
        >
          {cheapestPrice.original_price}
        </p>
      )}
    </div>
  )
}
