import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import User from "@/modules/common/icons/user"
import { B2BCustomer } from "@/types/global"

export default async function AccountButton({
  customer,
}: {
  customer: B2BCustomer | null
}) {
  return (
    <LocalizedClientLink className="hover:text-ui-fg-base" href="/account">
      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50">
        <User className="h-4 w-4" />
        <span className="hidden small:inline-block">
          {customer ? customer.first_name || "Account" : "Log in"}
        </span>
      </span>
    </LocalizedClientLink>
  )
}
