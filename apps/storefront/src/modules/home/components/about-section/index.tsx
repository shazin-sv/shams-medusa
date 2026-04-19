import { Heading, Text } from "@medusajs/ui"

const AboutSection = () => {
  return (
    <section
      className="content-container py-16 small:py-24"
      aria-labelledby="about-heading"
    >
      <Heading
        id="about-heading"
        level="h2"
        className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-6"
      >
        About Us
      </Heading>
      <Text className="text-ui-fg-subtle leading-relaxed max-w-3xl text-base">
        At Shams Tools, we are your trusted partner for high-quality industrial
        tools and premium building materials. Known across the Kingdom as a
        leading building materials supplier, we proudly serve contractors,
        companies, and individuals with products that meet the highest standards
        of durability and performance. Whether you are managing large-scale
        projects or DIY tasks, Shams Tools is committed to providing solutions
        that ensure strength, precision, and reliability.
      </Text>
    </section>
  )
}

export default AboutSection
