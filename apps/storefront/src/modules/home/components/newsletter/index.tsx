import LocalizedClientLink from "@/modules/common/components/localized-client-link"

const Newsletter = () => {
  return (
    <section className="section-shell bg-white">
      <div className="content-container">
        <div className="surface-card flex flex-col items-start justify-between gap-5 bg-slate-950 p-8 text-white small:flex-row small:items-center">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4b400]">
              Business support
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-white">
              Need bulk pricing or a quote?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
              Keep this simple. Retail buyers can shop normally, while business customers can use account and quote flows when needed.
            </p>
          </div>
          <LocalizedClientLink href="/account" className="btn-primary whitespace-nowrap">
            Go to account
          </LocalizedClientLink>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
