import { retrieveCustomer } from "@/lib/data/customer"
import ItemsPreviewTemplate from "@/modules/cart/templates/preview"
import CheckoutTotals from "@/modules/checkout/components/checkout-totals"
import PromotionCode from "@/modules/checkout/components/promotion-code"
import Review from "@/modules/checkout/components/review"
import Divider from "@/modules/common/components/divider"
import { B2BCart } from "@/types"

const CheckoutSummary = async ({ cart }: { cart: B2BCart }) => {
  const customer = await retrieveCustomer()

  return (
    <div className="surface-card sticky top-24 h-fit w-full p-5 small:p-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
        Order overview
      </div>
      <div className="mt-4">
        <ItemsPreviewTemplate items={cart?.items} currencyCode={cart.currency_code} />
      </div>
      <Divider className="my-4" />
      <CheckoutTotals cartOrOrder={cart} />
      <PromotionCode cart={cart} />
      <Divider className="my-4" />
      <Review cart={cart} customer={customer} />
    </div>
  )
}

export default CheckoutSummary
