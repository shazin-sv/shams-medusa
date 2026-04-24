const ContactSection = () => {
  return (
    <section
      className="section-spacing bg-white border-t border-black"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="content-container">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] block mb-2">
            Get in Touch
          </span>
          <h2 
            id="contact-heading"
            className="font-display text-3xl small:text-4xl font-extrabold tracking-tight"
          >
            Contact & Location
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black">
          {/* Address */}
          <div className="bg-white p-8">
            <span className="font-mono text-[10px] uppercase tracking-widest block mb-2">
              Address
            </span>
            <address className="font-body text-base not-italic">
              Al Qandeel Street
              <br />
              Al Aziziyah District
              <br />
              Jeddah 23334, KSA
            </address>
          </div>

          {/* Contact Info */}
          <div className="bg-white p-8">
            <span className="font-mono text-[10px] uppercase tracking-widest block mb-2">
              Contact
            </span>
            <div className="space-y-2">
              <a
                href="mailto:contact@shamstools.com"
                className="font-body text-base block hover:underline"
              >
                contact@shamstools.com
              </a>
              <a
                href="https://wa.me/966539329973"
                target="_blank"
                rel="noreferrer"
                className="font-body text-base block hover:underline"
              >
                +966 53 932 9973
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-8 md:col-span-2">
            <span className="font-mono text-[10px] uppercase tracking-widest block mb-2">
              Working Hours
            </span>
            <ul className="font-mono text-sm">
              <li>MORNING: 07:30 AM – 02:00 PM</li>
              <li>EVENING: 04:30 PM – 08:00 PM</li>
              <li>FRIDAY: CLOSED</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection