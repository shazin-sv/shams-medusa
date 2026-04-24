import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
} from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"

const ProductFacts = ({ product }: { product: HttpTypes.StoreProduct }) => {
  const managedVariants = product.variants?.filter(
    (variant) => variant.manage_inventory !== false
  )

  const inventoryQuantity =
    managedVariants?.reduce(
      (acc, variant) => acc + (variant.inventory_quantity ?? 0),
      0
    ) || 0

  const hasManageInventory = !!managedVariants?.length

  return (
    <div className="grid w-full gap-3 small:grid-cols-2">
      {hasManageInventory && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-950">
            {inventoryQuantity > 10 ? (
              <CheckCircleSolid className="text-emerald-600" />
            ) : (
              <ExclamationCircleSolid className="text-amber-500" />
            )}
            Availability
          </div>
          <p className="mt-2 leading-6">
            {inventoryQuantity > 10
              ? `Ready to ship, ${inventoryQuantity} in stock.`
              : `Limited quantity available, ${inventoryQuantity} in stock.`}
          </p>
        </div>
      )}

      {product.mid_code && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-950">
            <InformationCircleSolid className="text-slate-500" />
            Product reference
          </div>
          <p className="mt-2 leading-6">MID: {product.mid_code}</p>
        </div>
      )}
    </div>
  )
}

export default ProductFacts
