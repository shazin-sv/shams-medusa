import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { ArrowRight, ShieldCheck, ShoppingCart, Truck } from "lucide-react"

const Hero = () => {
  return (
    <section className="bg-slate-100">
      <div className="content-container grid gap-6 py-8 small:py-10 large:grid-cols-[1.2fr_0.8fr] large:items-stretch">
        <div className="overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f172a,#1e293b)] px-6 py-10 text-white small:px-10 small:py-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-100">
            <ShieldCheck className="h-4 w-4 text-[#f4b400]" />
            B2C and B2B ready storefront
          </div>

          <h1 className="mt-6 max-w-3xl font-[Manrope] text-[clamp(2.4rem,6vw,4.8rem)] font-extrabold leading-[0.96] tracking-[-0.06em] text-white">
            Tools, hardware and materials in a clean commerce-first store.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
            Browse products quickly, add to cart easily, and request quotes when needed. This layout is built for everyday buyers and business customers without clutter.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <LocalizedClientLink href="/store" className="btn-primary">
              Shop now
              <ArrowRight className="h-4 w-4" />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="btn-ghost border-white/20 bg-white/5 text-white hover:bg-white/10">
              View cart
            </LocalizedClientLink>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="surface-card p-6 small:p-7">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#d59a00]">
              Why it works
            </div>
            <h2 className="mt-3 font-[Manrope] text-3xl font-extrabold tracking-[-0.05em] text-slate-950">
              The basic things a tools store needs.
            </h2>
            <div className="mt-5 grid gap-4">
              {[
                {
                  icon: ShoppingCart,
                  title: "Easy buying flow",
                  text: "Clear category browsing, product cards and checkout steps.",
                },
                {
                  icon: Truck,
                  title: "Built for delivery",
                  text: "Practical layout for browsing stock and moving to purchase faster.",
                },
                {
                  icon: ShieldCheck,
                  title: "Quote support",
                  text: "B2B options stay available without overwhelming normal shoppers.",
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f4b400]/15 text-slate-950">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-950">{item.title}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-4 small:grid-cols-3">
            {[
              ["Fast browsing", "Category-led"],
              ["Request quote", "B2B basic"],
              ["Clean checkout", "B2C ready"],
            ].map(([title, text]) => (
              <div key={title} className="surface-card p-5 text-center">
                <div className="text-lg font-extrabold tracking-[-0.03em] text-slate-950">{title}</div>
                <div className="mt-1 text-sm text-slate-500">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
