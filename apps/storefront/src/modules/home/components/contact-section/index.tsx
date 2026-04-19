import { Heading, Text } from "@medusajs/ui"

const ContactSection = () => {
  return (
    <section
      className="bg-neutral-100 border-t border-ui-border-base py-16 small:py-24"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="content-container">
        <Heading
          id="contact-heading"
          level="h2"
          className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-8"
        >
          Contact &amp; Location
        </Heading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
          <div>
            <Text className="txt-compact-small-plus text-ui-fg-base mb-2">
              Address
            </Text>
            <address className="text-ui-fg-subtle text-sm leading-relaxed not-italic">
              Al Qandeel Street, Al Aziziyah District
              <br />
              Jeddah 23334, KSA
            </address>
          </div>

          <div>
            <Text className="txt-compact-small-plus text-ui-fg-base mb-2">
              Email
            </Text>
            <a
              href="mailto:contact@shamstools.com"
              className="text-ui-fg-subtle text-sm hover:text-ui-fg-base"
            >
              contact@shamstools.com
            </a>

            <Text className="txt-compact-small-plus text-ui-fg-base mb-2 mt-6">
              Phone / WhatsApp
            </Text>
            <a
              href="https://wa.me/966539329973"
              target="_blank"
              rel="noreferrer"
              className="text-ui-fg-subtle text-sm hover:text-ui-fg-base"
            >
              +966 53 932 9973
            </a>
          </div>

          <div className="md:col-span-2">
            <Text className="txt-compact-small-plus text-ui-fg-base mb-2">
              Working hours
            </Text>
            <ul className="text-ui-fg-subtle text-sm space-y-1">
              <li>Morning: 07:30 AM – 02:00 PM</li>
              <li>Evening: 04:30 PM – 08:00 PM</li>
              <li>Friday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
