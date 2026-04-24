"use client"

import { useCart } from "@/lib/context/cart-context"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import CartToCsvButton from "@/modules/cart/components/cart-to-csv-button"
import CartTotals from "@/modules/cart/components/cart-totals"
import PromotionCode from "@/modules/checkout/components/promotion-code"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { RequestQuoteConfirmation } from "@/modules/quotes/components/request-quote-confirmation"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"
import { B2BCustomer } from "@/types"
import { ApprovalStatusType } from "@/types/approval"
import { ExclamationCircle } from "@medusajs/icons"

type SummaryProps = {
  customer: B2BCustomer | null
  spendLimitExceeded: boolean
}

const Summary = ({ customer, spendLimitExceeded }: SummaryProps) => {
  const { handleEmptyCart, cart } = useCart()

  if (!cart) return null

  const checkoutStep = getCheckoutStep(cart)
  const checkoutPath = checkoutStep
    ? `/checkout?step=${checkoutStep}`
    : "/checkout"

  const checkoutButtonLink = customer ? checkoutPath : "/account"

  const isPendingApproval = cart?.approvals?.some(
    (approval) => approval?.status === ApprovalStatusType.PENDING
  )

  return (
    <div className="surface-card p-5 small:p-6">
      <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
        Order summary
      </div>
      <div className="mt-4">
        <CartTotals />
      </div>
      <Divider />
      <PromotionCode cart={cart} />
      <Divider className="my-5" />
      {spendLimitExceeded && (
        <div className="mb-4 flex items-center gap-x-2 rounded-2xl border border-amber-200 bg-amber-50 p-3">
          <ExclamationCircle className="w-fit overflow-visible text-amber-600" />
          <p className="text-xs text-amber-900">
            This order exceeds your spending limit. Please contact your manager for approval.
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <LocalizedClientLink href={checkoutButtonLink} data-testid="checkout-button">
          <Button className="w-full" disabled={spendLimitExceeded}>
            {customer
              ? spendLimitExceeded
                ? "Spending Limit Exceeded"
                : "Proceed to checkout"
              : "Log in to checkout"}
          </Button>
        </LocalizedClientLink>
        {!!customer && (
          <RequestQuoteConfirmation>
            <Button className="w-full" variant="secondary" disabled={isPendingApproval}>
              Request quote
            </Button>
          </RequestQuoteConfirmation>
        )}
        {!customer && (
          <RequestQuotePrompt>
            <Button className="w-full" variant="secondary" disabled={isPendingApproval}>
              Request quote
            </Button>
          </RequestQuotePrompt>
        )}
        <CartToCsvButton cart={cart} />
        <Button
          onClick={handleEmptyCart}
          className="w-full"
          variant="transparent"
          disabled={isPendingApproval}
        >
          Empty cart
        </Button>
      </div>
    </div>
  )
}

export default Summary
