"use client"

import { useCart } from "@/lib/context/cart-context"
import { checkSpendingLimit } from "@/lib/util/check-spending-limit"
import { getCheckoutStep } from "@/lib/util/get-checkout-step"
import { convertToLocale } from "@/lib/util/money"
import AppliedPromotions from "@/modules/cart/components/applied-promotions"
import ApprovalStatusBanner from "@/modules/cart/components/approval-status-banner"
import ItemsTemplate from "@/modules/cart/templates/items"
import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import ShoppingBag from "@/modules/common/icons/shopping-bag"
import FreeShippingPriceNudge from "@/modules/shipping/components/free-shipping-price-nudge"
import { B2BCustomer } from "@/types"
import { StoreFreeShippingPrice } from "@/types/shipping-option/http"
import { ExclamationCircle, LockClosedSolidMini } from "@medusajs/icons"
import { StoreCart } from "@medusajs/types"
import { Drawer, Text } from "@medusajs/ui"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

type CartDrawerProps = {
  customer: B2BCustomer | null
  freeShippingPrices: StoreFreeShippingPrice[]
}

const CartDrawer = ({
  customer,
  freeShippingPrices,
  ...props
}: CartDrawerProps) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  const { cart } = useCart()

  const items = cart?.items || []
  const promotions = cart?.promotions || []

  const totalItems =
    items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = useMemo(() => cart?.item_subtotal ?? 0, [cart])

  const spendLimitExceeded = useMemo(
    () => checkSpendingLimit(cart, customer),
    [cart, customer]
  )

  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    if (isOpen) {
      return
    }

    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  const cancelTimerRef = useRef(() => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }
  })

  useEffect(() => {
    cancelTimerRef.current = () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  useEffect(() => {
    if (
      itemRef.current !== totalItems &&
      !pathname.includes("/cart") &&
      !pathname.includes("/account")
    ) {
      timedOpen()
      itemRef.current = totalItems
      return
    }

    itemRef.current = totalItems
  }, [pathname, totalItems])

  useEffect(() => {
    cancelTimerRef.current()
    close()
  }, [pathname])

  const checkoutStep = cart ? getCheckoutStep(cart) : undefined
  const checkoutPath = customer
    ? checkoutStep
      ? `/checkout?step=${checkoutStep}`
      : "/checkout"
    : "/account"

  return (
    <>
      <Drawer
        direction="right"
        onMouseEnter={() => cancelTimerRef.current()}
        className="z-[220]"
        open={isOpen}
        onOpenChange={setIsOpen}
        {...(props as any)}
      >
        <Drawer.Trigger asChild>
          <button className="inline-flex items-center gap-2 rounded-full border-2 border-slate-950 bg-[#f4b400] px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden small:inline-block">
              {cart && items && items.length > 0
                ? convertToLocale({
                    amount: subtotal,
                    currency_code: cart.currency_code,
                  })
                : "Cart"}
            </span>
            <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-slate-950 px-2 py-0.5 text-[11px] font-bold text-white">
              {totalItems}
            </span>
          </button>
        </Drawer.Trigger>
        <Drawer.Content
          className="fixed top-0 right-0 z-[230] m-0 h-full w-full bg-white p-0 sm:w-[440px]"
          onMouseEnter={() => cancelTimerRef.current()}
        >
          <Drawer.Header className="flex self-center">
            <Drawer.Title>
              {totalItems > 0
                ? `You have ${totalItems} items in your cart`
                : "Your cart is empty"}
            </Drawer.Title>
          </Drawer.Header>
          {cart?.approvals && cart.approvals.length > 0 && (
            <div className="p-4">
              <ApprovalStatusBanner cart={cart} />
            </div>
          )}
          {promotions.length > 0 && (
            <div className="p-4">
              <AppliedPromotions promotions={promotions} />
            </div>
          )}
          <div className="flex h-full flex-col justify-between gap-y-4 self-stretch overflow-auto">
            {cart && cart.items && (
              <>
                <ItemsTemplate
                  cart={cart}
                  showBorders={false}
                  showTotal={false}
                />
                <div className="flex w-full flex-col gap-y-3 p-4">
                  {cart && freeShippingPrices && (
                    <FreeShippingPriceNudge
                      variant="inline"
                      cart={cart as StoreCart}
                      freeShippingPrices={freeShippingPrices}
                    />
                  )}
                  <div className="flex justify-between">
                    <Text>Subtotal</Text>
                    <Text>
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cart?.currency_code,
                      })}
                    </Text>
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <LocalizedClientLink href="/cart">
                      <Button
                        variant="secondary"
                        className="w-full"
                        size="large"
                      >
                        View Cart
                      </Button>
                    </LocalizedClientLink>
                    <LocalizedClientLink href={checkoutPath}>
                      <Button
                        className="w-full"
                        size="large"
                        disabled={totalItems === 0 || spendLimitExceeded}
                      >
                        <LockClosedSolidMini />
                        {customer
                          ? spendLimitExceeded
                            ? "Spending Limit Exceeded"
                            : "Secure Checkout"
                          : "Log in to checkout"}
                      </Button>
                    </LocalizedClientLink>
                    {spendLimitExceeded && (
                      <div className="flex items-center gap-x-3 rounded-2xl border border-amber-200 bg-amber-50 p-3">
                        <ExclamationCircle className="w-fit overflow-visible text-amber-600" />
                        <p className="text-xs font-medium text-amber-900">
                          This order exceeds your spending limit. Please contact
                          your manager for approval.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default CartDrawer
