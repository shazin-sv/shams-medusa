import { getCartApprovalStatus } from "@/lib/util/get-cart-approval-status"
import { convertToLocale } from "@/lib/util/money"
import ItemFull from "@/modules/cart/components/item-full"
import { B2BCart } from "@/types/global"
import { StoreCartLineItem } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { useMemo } from "react"

type ItemsTemplateProps = {
  cart: B2BCart
  showBorders?: boolean
  showTotal?: boolean
}

const ItemsTemplate = ({
  cart,
  showBorders = true,
  showTotal = true,
}: ItemsTemplateProps) => {
  const items = cart?.items
  const totalQuantity = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0),
    [cart?.items]
  )

  const { isPendingAdminApproval, isPendingSalesManagerApproval } =
    getCartApprovalStatus(cart)

  const isPendingApproval =
    isPendingAdminApproval || isPendingSalesManagerApproval

  return (
    <div className="flex w-full flex-col gap-y-4">
      <div className="flex flex-col gap-y-4 w-full">
        {items &&
          items.map((item: StoreCartLineItem) => {
            return (
              <ItemFull
                disabled={isPendingApproval}
                currencyCode={cart?.currency_code}
                showBorders={showBorders}
                key={item.id}
                item={
                  item as StoreCartLineItem & {
                    metadata?: { note?: string }
                  }
                }
              />
            )
          })}
      </div>
      {showTotal && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-start justify-between gap-4 self-stretch">
            <Text className="text-sm text-slate-600">Total: {totalQuantity} items</Text>
            <Text className="text-sm font-semibold text-slate-950">
              {convertToLocale({
                amount: cart?.item_total,
                currency_code: cart?.currency_code,
              })}
            </Text>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemsTemplate
