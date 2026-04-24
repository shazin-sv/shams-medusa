"use client"

import CompanyForm from "@/modules/checkout/components/company-form"
import Divider from "@/modules/common/components/divider"
import { B2BCart } from "@/types"
import { Heading } from "@medusajs/ui"

const Company = ({ cart }: { cart: B2BCart }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 small:p-6">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row items-center justify-between w-full">
          <Heading level="h2" className="text-xl font-bold text-slate-950">
            Company details
          </Heading>
        </div>
        <Divider />
        <div className="flex flex-col gap-y-2">
          <form>
            <CompanyForm cart={cart} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Company
