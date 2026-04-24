"use client"

import { setContactDetails } from "@/lib/data/cart"
import Divider from "@/modules/common/components/divider"
import { ApprovalStatusType, B2BCart, B2BCustomer } from "@/types"
import { CheckCircleSolid } from "@medusajs/icons"
import { Heading, Text, clx } from "@medusajs/ui"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useActionState, useCallback } from "react"
import ContactDetailsForm from "../contact-details-form"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"

const ContactDetails = ({
  cart,
  customer,
}: {
  cart: B2BCart | null
  customer: B2BCustomer | null
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const [message, formAction] = useActionState(setContactDetails, null)

  if (!cart) return null

  const isOpen = searchParams.get("step") === "contact-details"
  const isCompleted =
    cart.shipping_address?.address_1 &&
    cart.shipping_methods &&
    cart.shipping_methods?.length > 0 &&
    cart.billing_address?.address_1 &&
    cart.email

  const requiresApproval =
    cart.company?.approval_settings?.requires_admin_approval ||
    cart.company?.approval_settings?.requires_sales_manager_approval

  const cartApprovalStatus = cart?.approval_status?.status
  const customerIsAdmin = customer?.employee?.is_admin || false

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "contact-details"), {
      scroll: false,
    })
  }

  const handleSubmit = (formData: FormData) => {
    formAction(formData)

    const step =
      requiresApproval &&
      (!customerIsAdmin || cartApprovalStatus !== ApprovalStatusType.APPROVED)
        ? "review"
        : "payment"

    router.push(pathname + "?" + createQueryString("step", step), {
      scroll: false,
    })
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 small:p-6">
      <div className="flex flex-col gap-y-3">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading
            level="h2"
            className={clx("flex flex-row items-center gap-x-2 text-xl font-bold text-slate-950", {
              "pointer-events-none select-none opacity-50": !isOpen && !isCompleted,
            })}
          >
            Contact details
            {!isOpen && isCompleted && <CheckCircleSolid />}
          </Heading>

          {!isOpen &&
            isCompleted &&
            cartApprovalStatus !== ApprovalStatusType.PENDING && (
              <Text>
                <button onClick={handleEdit} className="text-sm font-semibold text-slate-600 hover:text-slate-950" data-testid="edit-contact-details-button">
                  Edit
                </button>
              </Text>
            )}
        </div>
        {(isOpen || isCompleted) && <Divider />}
        {isOpen ? (
          <form action={handleSubmit}>
            <div className="pb-2">
              <ContactDetailsForm customer={customer} cart={cart} />
              <div className="mt-4 flex flex-col items-end gap-y-2">
                <SubmitButton className="mt-2" data-testid="submit-address-button">
                  {requiresApproval && cartApprovalStatus !== ApprovalStatusType.APPROVED && !customerIsAdmin
                    ? "Review order"
                    : "Continue"}
                </SubmitButton>
                <ErrorMessage error={message} data-testid="address-error-message" />
              </div>
            </div>
          </form>
        ) : (
          cart &&
          isCompleted && (
            <div className="text-sm">
              <div className="flex flex-col gap-y-2" data-testid="contact-details-summary">
                <Text className="leading-7 text-slate-600">{cart.email}</Text>
                {cart.metadata?.notes ? (
                  <div>
                    <Divider />
                    <Text className="pt-2 leading-7 text-slate-600">
                      Note: {cart.metadata?.notes as string}
                    </Text>
                  </div>
                ) : null}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default ContactDetails
