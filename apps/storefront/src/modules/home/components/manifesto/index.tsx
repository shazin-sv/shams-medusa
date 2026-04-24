const Manifesto = () => {
  return (
    <section className="section-shell bg-white">
      <div className="content-container grid gap-5 small:grid-cols-3">
        {[
          ["Shop by category", "Make it easy for buyers to get into the right product group quickly."],
          ["Request quote", "Support business buying without making the whole site feel like an enterprise portal."],
          ["Clean checkout", "Keep the buying flow simple, clear and trustworthy on desktop and mobile."],
        ].map(([title, text]) => (
          <div key={title} className="surface-card p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#d59a00]">Core essential</div>
            <h2 className="mt-3 text-xl font-extrabold tracking-[-0.03em] text-slate-950">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Manifesto
