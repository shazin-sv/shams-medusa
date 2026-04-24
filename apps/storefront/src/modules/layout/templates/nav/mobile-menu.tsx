"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { Menu, ShoppingBag, User, X } from "lucide-react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"

type MobileMenuProps = {
  accountLabel?: string
  itemCount?: number
}

export default function MobileMenu({
  accountLabel = "Log in",
  itemCount = 0,
}: MobileMenuProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-slate-950/45 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-[90] flex h-[100dvh] w-[88vw] max-w-[360px] flex-col bg-white p-5 shadow-2xl focus:outline-none">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#d59a00]">
                Shamstools
              </div>
              <div className="font-[Manrope] text-xl font-extrabold tracking-[-0.04em] text-slate-950">
                Menu
              </div>
            </div>
            <Dialog.Close asChild>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex flex-col gap-2">
            {[
              { href: "/", label: "Home" },
              { href: "/store", label: "Shop" },
              { href: "/cart", label: "Cart" },
              { href: "/account", label: accountLabel },
            ].map((link) => (
              <Dialog.Close asChild key={link.href + link.label}>
                <LocalizedClientLink
                  href={link.href}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  {link.label}
                </LocalizedClientLink>
              </Dialog.Close>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-950 p-4 text-white">
              <User className="mb-3 h-5 w-5 text-[#f4b400]" />
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-300">Account</div>
              <div className="mt-1 text-sm font-bold">{accountLabel}</div>
            </div>
            <div className="rounded-2xl bg-[#f4b400] p-4 text-slate-950">
              <ShoppingBag className="mb-3 h-5 w-5" />
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">Cart</div>
              <div className="mt-1 text-sm font-bold">{itemCount} items</div>
            </div>
          </div>

          <div className="mt-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Need help?</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Browse categories, review your cart, and continue to checkout with a cleaner mobile flow.
            </p>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
