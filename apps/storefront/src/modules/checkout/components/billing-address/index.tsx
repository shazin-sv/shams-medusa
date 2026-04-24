"use client"

import { setBillingAddress, updateCart } from "@/lib/data/cart"
import compareAddresses from "@/lib/util/compare-addresses"
import BillingAddressForm from "@/modules/checkout/components/billing-address-form"
import ErrorMessage from "@/modules/checkout/components/error-message"
import { SubmitButton } from "@/modules/checkout/components/submit-button"
import CheckboxWithLabel from "@/modules/common/components/checkbox"
import Divider from "@/modules/common/components/divider"
import { B2BCart } from "@/types"
import { ApprovalStatusType } from "@/types/approval"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text, clx, useToggleState } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

const BillingAddress = ({ cart }: { cart: B2BCart | null }) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [error, setError] = useState<string | null>(null)

  const isOpen = searchParams.get("step") === "billing-address"
  const cartApprovalStatus = cart?.approval_status?.status

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.shipping_address && cart?.billing_address
      ? compareAddresses(cart?.shipping_address, cart?.billing_address)
      : false
  )

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "billing-address"), {
      scroll: false,
    })
  }

  const handleToggleSameAsBilling = async () => {
    toggleSameAsBilling()
    sameAsBilling && handleEdit()

    if (!sameAsBilling && cart?.shipping_address) {
      const { id, ...billing_address } = cart.shipping_address
      await updateCart({ billing_address })
      router.push(pathname + "?step=delivery", { scroll: false })
    }
  }

  const handleSubmit = async (formData: FormData) => {
    await setBillingAddress(formData).catch((e) => {
      setError(e.message)
      return
    })

    router.push(pathname + "?step=delivery", { scroll: false })
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 small:p-6">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-col justify-between gap-3 small:flex-row small:items-center">
          <div className="flex gap-x-2 items-center">
            <Heading
              level="h2"
              className={clx("flex flex-row items-center gap-x-2 text-xl font-bold text-slate-950", {
                "pointer-events-none select-none opacity-50": !isOpen && !cart?.billing_address?.address_1,
              })}
            >
              Billing address
            </Heading>
            {!isOpen && cart?.billing_address?.address_1 && <CheckCircleSolid />}
          </div>
          {cart?.shipping_address?.address_1 && (
            <CheckboxWithLabel
              disabled={cartApprovalStatus === ApprovalStatusType.PENDING}
              label="Same as shipping address"
              name="same_as_billing"
              checked={sameAsBilling}
              onChange={handleToggleSameAsBilling}
              data-testid="billing-address-checkbox"
            />
          )}
        </div>
        {!isOpen && cart?.billing_address?.address_1 && <Divider />}
        {isOpen ? (
          <div>
            <Divider />
            <form action={handleSubmit}>
              <div className="py-2">
                <BillingAddressForm cart={cart} />
              </div>
              <div className="flex flex-col items-end gap-y-2">
                <SubmitButton className="mt-4" data-testid="submit-address-button">
                  Continue
                </SubmitButton>
                <ErrorMessage error={error} data-testid="address-error-message" />
              </div>
            </form>
          </div>
        ) : (
          cart &&
          cart.shipping_address?.address_1 &&
          cart.billing_address?.first_name && (
            <div className="text-small-regular">
              <div className="flex items-start gap-x-8">
                <div className="flex" data-testid="billing-address-summary">
                  <Text className="text-sm leading-7 text-slate-600">
                    {cart.billing_address.first_name} {cart.billing_address.last_name}, {cart.billing_address.address_1}, {cart.billing_address.postal_code}, {cart.billing_address.city}, {cart.billing_address.country_code?.toUpperCase()}
                  </Text>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default BillingAddress
