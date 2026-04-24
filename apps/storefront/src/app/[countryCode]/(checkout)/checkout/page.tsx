import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import Wrapper from "@/modules/checkout/components/payment-wrapper"
import CheckoutForm from "@/modules/checkout/templates/checkout-form"
import CheckoutSummary from "@/modules/checkout/templates/checkout-summary"
import { B2BCart } from "@/types/global"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Checkout",
}

export default async function Checkout({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const cartId = searchParams?.cartId as string
  const cart = (await retrieveCart(cartId)) as B2BCart

  if (!cart) {
    return notFound()
  }

  const customer = await retrieveCustomer()

  return (
    <Wrapper cart={cart}>
      <div className="bg-slate-50 py-8 small:py-10">
        <div className="content-container grid grid-cols-1 gap-6 small:grid-cols-[1fr_400px] small:items-start">
          <CheckoutForm cart={cart} customer={customer} />
          <div className="relative">
            <CheckoutSummary cart={cart} />
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
