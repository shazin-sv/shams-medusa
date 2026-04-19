import { Heading, Text } from "@medusajs/ui"

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
      className="content-container py-16 small:py-24"
      aria-labelledby="value-heading"
    >
      <Heading
        id="value-heading"
        level="h2"
        className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-10"
      >
        Why Shams Tools
      </Heading>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {points.map((p) => (
          <li key={p.title}>
            <Heading
              level="h3"
              className="text-lg font-medium text-ui-fg-base mb-3"
            >
              {p.title}
            </Heading>
            <Text className="text-ui-fg-subtle text-sm leading-relaxed">
              {p.body}
            </Text>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ValueProposition
