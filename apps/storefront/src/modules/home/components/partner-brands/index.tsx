import { Heading } from "@medusajs/ui"

import { BrandCell } from "@/modules/home/components/partner-brands/brand-cell"

const brands = [
  { name: "Bosch", slug: "bosch" },
  { name: "DeWalt", slug: "dewalt" },
  { name: "Stanley", slug: "stanley" },
  { name: "Total", slug: "total" },
  { name: "Hilti", slug: "hilti" },
  { name: "Metabo", slug: "metabo" },
  { name: "Super Ego", slug: "super-ego" },
  { name: "APT", slug: "apt" },
  { name: "Pattex", slug: "pattex" },
  { name: "Soudal", slug: "soudal" },
]

const PartnerBrands = () => {
  return (
    <section
      className="bg-neutral-100 border-y border-ui-border-base py-16 small:py-24"
      aria-labelledby="partners-heading"
    >
      <div className="content-container">
        <Heading
          id="partners-heading"
          level="h2"
          className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-10 text-center"
        >
          Partner Brands
        </Heading>
        <ul className="grid grid-cols-2 small:grid-cols-3 md:grid-cols-5 gap-4">
          {brands.map((b) => (
            <li key={b.slug}>
              <BrandCell name={b.name} slug={b.slug} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PartnerBrands
