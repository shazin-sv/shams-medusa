"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import EmptyCartMessage from "@/modules/cart/components/empty-cart-message"
import SignInPrompt from "@/modules/cart/components/sign-in-prompt"
import ItemsTemplate from "@/modules/cart/templates/items"
import Summary from "@/modules/cart/templates/summary"
import { B2BCustomer } from "@/types/global"
import { useMemo } from "react"

const CartTemplate = ({ customer }: { customer: B2BCustomer | null }) => {
  const { cart } = useCart()

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const totalItems = useMemo(
    () => cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0,
    [cart?.items]
  )

  return (
    <div className="bg-slate-50 py-8 small:py-10">
      <div className="content-container" data-testid="cart-container">
        {cart?.items?.length ? (
          <section className="surface-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d59a00]">
                Shopping cart
              </div>
              <h1 className="mt-2 font-[Manrope] text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
                {totalItems} item{totalItems === 1 ? "" : "s"} in your cart
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
                Review quantities, continue shopping, or head to checkout with a cleaner summary panel.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 small:grid-cols-[1fr_360px] small:items-start">
              <div className="flex flex-col gap-y-4">
                {!customer && <SignInPrompt />}
                {cart?.approvals && cart.approvals.length > 0 && (
                  <ApprovalStatusBanner cart={cart} />
                )}
                <ItemsTemplate cart={cart} />
              </div>
              <div className="relative">
                <div className="sticky top-24">
                  {cart && cart.region && (
                    <Summary
                      customer={customer}
                      spendLimitExceeded={spendLimitExceeded}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
