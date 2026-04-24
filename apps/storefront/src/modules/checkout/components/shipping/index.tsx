"use client"

import { setShippingMethod } from "@/lib/data/cart"
import { convertToLocale } from "@/lib/util/money"
import ErrorMessage from "@/modules/checkout/components/error-message"
import Button from "@/modules/common/components/button"
import Divider from "@/modules/common/components/divider"
import Radio from "@/modules/common/components/radio"
import { ApprovalStatusType, B2BCart } from "@/types"
import { Radio as RadioGroupOption, RadioGroup } from "@headlessui/react"
import { CheckCircleSolid } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import { Heading, Text, clx } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

type ShippingProps = {
  cart: B2BCart
  availableShippingMethods: HttpTypes.StoreCartShippingOption[] | null
}

const Shipping: React.FC<ShippingProps> = ({
  cart,
  availableShippingMethods,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "delivery"
  const cartApprovalStatus = cart?.approval_status?.status

  const selectedShippingMethod = availableShippingMethods?.find(
    (method) => method.id === cart.shipping_methods?.at(-1)?.shipping_option_id
  )

  const selectedMethodId = selectedShippingMethod?.id || ""

  const handleEdit = () => {
    router.push(pathname + "?step=delivery", { scroll: false })
  }

  const handleSubmit = () => {
    router.push(pathname + "?step=contact-details", { scroll: false })
  }

  const set = async (id: string) => {
    setIsLoading(true)
    await setShippingMethod({ cartId: cart.id, shippingMethodId: id })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
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
              "pointer-events-none select-none opacity-50": !isOpen && cart.shipping_methods?.length === 0,
            })}
          >
            Delivery method
            {!isOpen && (cart.shipping_methods?.length ?? 0) > 0 && <CheckCircleSolid />}
          </Heading>
          {!isOpen &&
            cart?.shipping_address &&
            cart?.billing_address &&
            cart?.email &&
            cartApprovalStatus !== ApprovalStatusType.PENDING && (
              <Text>
                <button onClick={handleEdit} className="text-sm font-semibold text-slate-600 hover:text-slate-950" data-testid="edit-delivery-button">
                  Edit
                </button>
              </Text>
            )}
        </div>
        {(isOpen || (cart && (cart.shipping_methods?.length ?? 0) > 0)) && <Divider />}
      </div>
      {isOpen ? (
        <div data-testid="delivery-options-container">
          <RadioGroup value={selectedMethodId} onChange={set}>
            {availableShippingMethods?.map((option) => (
              <div key={option.id}>
                <RadioGroupOption
                  value={option.id}
                  data-testid="delivery-option-radio"
                  className={clx(
                    "flex cursor-pointer items-center justify-between rounded-2xl px-3 py-4 text-sm",
                    option.id === selectedShippingMethod?.id ? "bg-slate-50" : "bg-white"
                  )}
                >
                  <div className="flex items-center gap-x-4">
                    <Radio checked={option.id === selectedShippingMethod?.id} />
                    <span className="font-medium text-slate-900">{option.name}</span>
                  </div>
                  <span className="font-semibold text-slate-950">
                    {convertToLocale({
                      amount: option.amount!,
                      currency_code: cart?.currency_code,
                    })}
                  </span>
                </RadioGroupOption>
                <Divider className="my-2" />
              </div>
            ))}
          </RadioGroup>
          <div className="mt-4 flex flex-col items-end gap-y-2">
            <ErrorMessage error={error} data-testid="delivery-option-error-message" />
            <Button
              className="mt-2"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={!cart.shipping_methods?.[0]}
              data-testid="submit-delivery-option-button"
            >
              Continue
            </Button>
          </div>
        </div>
      ) : (
        cart.shipping_methods &&
        cart.shipping_methods?.length > 0 && (
          <div className="pt-2 text-sm">
            <Text className="leading-7 text-slate-600">
              {selectedShippingMethod?.name} {convertToLocale({ amount: selectedShippingMethod?.amount!, currency_code: cart?.currency_code })}
            </Text>
          </div>
        )
      )}
    </div>
  )
}

export default Shipping
