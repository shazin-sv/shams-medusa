const AboutSection = () => {
  return (
    <section
      className="section-spacing-lg bg-[#F5F5F5] border-b border-black"
      aria-labelledby="about-heading"
    >
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Tag */}
          <div className="lg:col-span-2">
            <span className="font-mono text-xs uppercase tracking-[0.25em] block">
              Our Story
            </span>
          </div>

          {/* Center: Quote */}
          <div className="lg:col-span-8">
            <h2 
              id="about-heading"
              className="font-display text-4xl small:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-8"
            >
              &quot;Empowering Construction Excellence&quot;
            </h2>
            
            <div className="quote-divider" />
            
            <p className="font-body text-lg leading-relaxed max-w-3xl">
              At Shams Tools, we are your trusted partner for high-quality industrial
              tools and premium building materials. Known across the Kingdom as a
              leading building materials supplier, we proudly serve contractors,
              companies, and individuals with products that meet the highest standards
              of durability and performance.
            </p>
            
            <a 
              href="#contact" 
              className="inline-block mt-8 font-mono text-xs uppercase tracking-widest border-b border-black pb-1 hover:opacity-60"
            >
              Read More →
            </a>
          </div>

          {/* Right: Empty or image placeholder */}
          <div className="lg:col-span-2">
            <div className="wireframe-img aspect-square" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection