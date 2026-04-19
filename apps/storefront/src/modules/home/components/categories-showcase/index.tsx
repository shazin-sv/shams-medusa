import { Heading, Text } from "@medusajs/ui"

const categories: { title: string; description: string }[] = [
  {
    title: "Industrial Tools",
    description:
      "High-quality drilling, cutting, and welding equipment for professional use.",
  },
  {
    title: "Construction Equipment",
    description:
      "Reliable ladders, safety gear, and scaffolding for construction projects.",
  },
  {
    title: "Building Materials",
    description:
      "Premium cement, tiles, concrete mixes, and paints for all your building needs.",
  },
  {
    title: "Hand Tools",
    description:
      "Professional-grade wrenches, hammers, and screwdrivers for precise work.",
  },
  {
    title: "Fasteners & Hardware",
    description:
      "Comprehensive range of fasteners, hardware, and electrical supplies.",
  },
  {
    title: "Plumbing Solutions",
    description:
      "Complete plumbing supplies and solutions for all projects.",
  },
]

const CategoriesShowcase = () => {
  return (
    <section
      className="bg-neutral-100 border-y border-ui-border-base py-16 small:py-24"
      aria-labelledby="categories-heading"
    >
      <div className="content-container">
        <Heading
          id="categories-heading"
          level="h2"
          className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-10"
        >
          Product Categories
        </Heading>
        <ul className="grid grid-cols-1 small:grid-cols-2 gap-8">
          {categories.map((c) => (
            <li
              key={c.title}
              className="bg-white border border-ui-border-base rounded-lg p-6 shadow-borders-base"
            >
              <Heading
                level="h3"
                className="text-lg font-medium text-ui-fg-base mb-2"
              >
                {c.title}
              </Heading>
              <Text className="text-ui-fg-subtle text-sm leading-relaxed">
                {c.description}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default CategoriesShowcase
