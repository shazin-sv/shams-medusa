import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { Headset, MapPin, ShieldCheck, Truck } from "lucide-react"

const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-950 text-white">
      <div className="border-b border-white/10">
        <div className="content-container grid gap-4 py-6 small:grid-cols-2 large:grid-cols-4">
          {[
            {
              icon: Truck,
              title: "Fast fulfilment",
              text: "Delivery support for Jeddah, Riyadh and wider KSA coverage.",
            },
            {
              icon: ShieldCheck,
              title: "Reliable sourcing",
              text: "Professional tools and materials selected for contractors and serious buyers.",
            },
            {
              icon: Headset,
              title: "Sales support",
              text: "Assistance for product selection, quotes and bulk purchasing workflows.",
            },
            {
              icon: MapPin,
              title: "Based in Saudi Arabia",
              text: "A storefront built around local industrial and construction demand.",
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <Icon className="mb-3 h-5 w-5 text-[#f4b400]" />
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="content-container grid gap-10 py-12 small:grid-cols-2 large:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#f4b400]">
            Shamstools
          </div>
          <h2 className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-[-0.05em] text-white">
            Industrial tools and building materials with a more trustworthy buying experience.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
            Browse professional products, compare pricing, request quotes, and checkout with a cleaner storefront built for real eCommerce use.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Shop</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li><LocalizedClientLink href="/store">All Products</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/store?sortBy=created_at">New Arrivals</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/cart">Cart</LocalizedClientLink></li>
            <li><LocalizedClientLink href="/account">Account</LocalizedClientLink></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Why customers buy</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-300">
            <li>Clear product browsing</li>
            <li>Industrial-focused presentation</li>
            <li>Bulk and quote-friendly checkout</li>
            <li>Responsive shopping flow</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Store note</h3>
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
            This redesigned storefront keeps the Medusa backend intact while upgrading the customer experience on homepage, product discovery, cart, and checkout.
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="content-container flex flex-col gap-3 py-5 text-xs uppercase tracking-[0.16em] text-slate-400 small:flex-row small:items-center small:justify-between">
          <span>© 2026 Shams Tools. All rights reserved.</span>
          <span>Professional tools, hardware and materials for Saudi Arabia</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
