"use client"

import { isStripeLike, paymentInfoMap } from "@/lib/constants"
import { initiatePaymentSession } from "@/lib/data/cart"
import ErrorMessage from "@/modules/checkout/components/error-message"
import PaymentContainer from "@/modules/checkout/components/payment-container"
import { StripeContext } from "@/modules/checkout/components/payment-wrapper"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import { ApprovalStatusType } from "@/types"
import { RadioGroup } from "@headlessui/react"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { CardElement } from "@stripe/react-stripe-js"
import { StripeCardElementOptions } from "@stripe/stripe-js"
import { Heading, Text, clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [cardBrand, setCardBrand] = useState<string | null>(null)
  const [cardComplete, setCardComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    activeSession?.provider_id ?? ""
  )

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const isOpen = searchParams.get("step") === "payment"

  const cartApprovalStatus = cart.approval_status?.status
  const stripeReady = useContext(StripeContext)

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const useOptions: StripeCardElementOptions = useMemo(() => {
    return {
      style: {
        base: {
          fontFamily: "Inter, sans-serif",
          color: "#111827",
          "::placeholder": {
            color: "rgb(107 114 128)",
          },
        },
      },
      classes: {
        base: "form-control",
      },
    }
  }, [])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const shouldInputCard = isStripeLike(selectedPaymentMethod) && !activeSession

      if (!activeSession || activeSession.provider_id !== selectedPaymentMethod) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
        })
      }

      if (!shouldInputCard) {
        return router.push(pathname + "?" + createQueryString("step", "review"), {
          scroll: false,
        })
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 small:p-6">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading
            level="h2"
            className={clx("flex flex-row items-center gap-x-2 text-xl font-bold text-slate-950", {
              "pointer-events-none select-none opacity-50": !isOpen && !paymentReady,
            })}
          >
            Payment method
            {!isOpen && paymentReady && <CheckCircleSolid />}
          </Heading>
          {!isOpen &&
            paymentReady &&
            cartApprovalStatus !== ApprovalStatusType.PENDING && (
              <Text>
                <button onClick={handleEdit} className="text-sm font-semibold text-slate-600 hover:text-slate-950" data-testid="edit-payment-button">
                  Edit
                </button>
              </Text>
            )}
        </div>
        {(isOpen || (cart && paymentReady && activeSession)) && <Divider />}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard && availablePaymentMethods?.length ? (
            <>
              <RadioGroup value={selectedPaymentMethod} onChange={(value: string) => setSelectedPaymentMethod(value)}>
                {availablePaymentMethods
                  .sort((a, b) => {
                    return a.provider_id > b.provider_id ? 1 : -1
                  })
                  .map((paymentMethod) => {
                    return (
                      <PaymentContainer
                        paymentInfoMap={paymentInfoMap}
                        paymentProviderId={paymentMethod.id}
                        key={paymentMethod.id}
                        selectedPaymentOptionId={selectedPaymentMethod}
                      />
                    )
                  })}
              </RadioGroup>
              {stripeReady && selectedPaymentMethod === "pp_stripe_stripe" && (
                <div className="mt-5">
                  <Text className="mb-2 text-sm font-semibold text-slate-950">
                    Enter your card details
                  </Text>
                  <CardElement
                    options={useOptions as StripeCardElementOptions}
                    onChange={(e) => {
                      setCardBrand(
                        e.brand && e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                      )
                      setError(e.error?.message || null)
                      setCardComplete(e.complete)
                    }}
                  />
                </div>
              )}
            </>
          ) : null}

          {paidByGiftcard && (
            <div className="flex flex-col">
              <Text className="text-sm text-slate-600">Gift card</Text>
            </div>
          )}

          <div className="mt-4 flex flex-col items-end gap-y-2">
            <ErrorMessage error={error} data-testid="payment-method-error-message" />
            <Button
              className="mt-2"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={
                (selectedPaymentMethod === "pp_stripe_stripe" && !cardComplete) ||
                (!selectedPaymentMethod && !paidByGiftcard)
              }
              data-testid="submit-payment-button"
            >
              {!activeSession && isStripeLike(selectedPaymentMethod) ? "Enter card details" : "Continue"}
            </Button>
          </div>
        </div>

        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession ? (
            <div className="flex items-center gap-x-3 pt-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                {paymentInfoMap[selectedPaymentMethod]?.icon || <CreditCard />}
              </div>
              <div>
                <Text className="text-sm font-semibold text-slate-950" data-testid="payment-method-summary">
                  {paymentInfoMap[selectedPaymentMethod]?.title || selectedPaymentMethod}
                </Text>
                <Text className="text-sm text-slate-500" data-testid="payment-details-summary">
                  {isStripeLike(selectedPaymentMethod) && cardBrand
                    ? cardBrand
                    : paymentInfoMap[selectedPaymentMethod]?.title}
                </Text>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="pt-2">
              <Text className="text-sm text-slate-600" data-testid="payment-method-summary">
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Payment
