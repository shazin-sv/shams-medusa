import { retrieveCart } from "@/lib/data/cart"
import { retrieveCustomer } from "@/lib/data/customer"
import AccountButton from "@/modules/account/components/account-button"
import CartButton from "@/modules/cart/components/cart-button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { MegaMenuWrapper } from "@/modules/layout/components/mega-menu"
import SkeletonAccountButton from "@/modules/skeletons/components/skeleton-account-button"
import SkeletonCartButton from "@/modules/skeletons/components/skeleton-cart-button"
import { Suspense } from "react"
import HeaderSearch from "./header-search"
import MobileMenu from "./mobile-menu"
import TopStrip from "./top-strip"

export async function NavigationHeader() {
  const customer = await retrieveCustomer().catch(() => null)
  const cart = await retrieveCart().catch(() => null)

  const totalItems =
    cart?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  return (
    <header className="sticky top-0 z-[100] border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <TopStrip />

      <div className="content-container flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-6">
            <LocalizedClientLink href="/" className="flex min-w-0 flex-col">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#d59a00]">
                Shamstools
              </span>
              <span className="font-[Manrope] text-2xl font-extrabold tracking-[-0.04em] text-slate-950">
                SHAMS TOOLS
              </span>
            </LocalizedClientLink>
          </div>

          <div className="hidden min-w-0 flex-1 large:flex large:justify-center">
            <HeaderSearch />
          </div>

          <div className="flex items-center gap-3 small:gap-4">
            <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600 medium:block">
              {totalItems} item{totalItems === 1 ? "" : "s"}
            </div>

            <Suspense fallback={<SkeletonAccountButton />}>
              <AccountButton customer={customer} />
            </Suspense>

            <Suspense fallback={<SkeletonCartButton />}>
              <CartButton />
            </Suspense>

            <div className="small:hidden">
              <MobileMenu
                accountLabel={customer ? customer.first_name || "Account" : "Log in"}
                itemCount={totalItems}
              />
            </div>
          </div>
        </div>

        <div className="large:hidden">
          <HeaderSearch />
        </div>

        <div className="hidden items-center gap-7 border-t border-slate-200 pt-3 small:flex">
          <LocalizedClientLink href="/store" className="nav-link">
            Shop All
          </LocalizedClientLink>
          <MegaMenuWrapper />
          <LocalizedClientLink href="/store" className="nav-link">
            Deals
          </LocalizedClientLink>
          <LocalizedClientLink href="/account" className="nav-link">
            B2B Account
          </LocalizedClientLink>
          <LocalizedClientLink href="/cart" className="nav-link">
            Cart
          </LocalizedClientLink>
        </div>
      </div>
    </header>
  )
}
