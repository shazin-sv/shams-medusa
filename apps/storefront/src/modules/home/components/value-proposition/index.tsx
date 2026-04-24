const points: { title: string; body: string }[] = [
  {
    title: "Premium Quality Products",
    body: "All our tools and materials meet the highest standards of durability and performance for professional use.",
  },
  {
    title: "Extensive Product Range",
    body: "From industrial tools to building materials, we offer comprehensive solutions for all your construction needs.",
  },
  {
    title: "Expert Customer Support",
    body: "Our knowledgeable team provides professional advice to help you find the right products for your projects.",
  },
]

const ValueProposition = () => {
  return (
    <section
      className="section-spacing bg-white border-b border-black"
      aria-labelledby="value-heading"
    >
      <div className="content-container">
        <div className="mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] block mb-2">
            Why Choose Us
          </span>
          <h2 
            id="value-heading"
            className="font-display text-3xl small:text-4xl font-extrabold tracking-tight"
          >
            Why Shams Tools
          </h2>
        </div>
        
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black">
          {points.map((p, index) => (
            <li key={p.title} className="bg-white p-8">
              <h3 className="font-display text-xl font-bold mb-4">
                {p.title}
              </h3>
              <p className="font-body text-base leading-relaxed text-gray-600">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default ValueProposition