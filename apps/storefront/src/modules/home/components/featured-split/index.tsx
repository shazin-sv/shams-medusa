const FeaturedSplit = () => {
  return (
    <section className="section-brutalist">
      <div className="content-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px">
          
          {/* Left Column - Large Wireframe */}
          <div className="aspect-square lg:aspect-[4/3] wireframe-img" />
          
          {/* Right Column - Content */}
          <div className="p-6 small:p-8 space-y-6">
            {/* Featured Tag */}
            <div className="mb-6">
              <span className="font-brutalist-mono inline-block">
                FEATURED
              </span>
            </div>

            {/* Multi-line Title */}
            <h2 className="font-display font-extrabold tracking-tight text-3xl small:text-4xl lg:text-5xl mb-4 leading-[1.05]">
              Premium Tools<br />For Professional<br />Construction Projects
            </h2>

            {/* Description */}
            <p className="font-brutalist-body text-lg mb-8 leading-relaxed">
              Carefully selected equipment and materials that meet the highest standards of quality and performance. 
              Trusted by professionals across Saudi Arabia for demanding commercial and industrial applications.
            </p>

            {/* Bento Grid - Materials */}
            <div className="grid-brutalist grid-cols-2 gap-px mb-6">
              <div className="p-6 space-y-4">
                <h3 className="font-display font-extrabold tracking-tight text-xl small:text-2xl mb-2">
                  MATERIALS
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-brutalist-mono">PREMIUM CEMENT</span>
                    <span className="font-brutalist-mono text-xs">GRADE 42.5</span>
                  </div>
                  <p className="font-brutalist-body text-sm">
                    High-strength Portland cement with enhanced durability and rapid curing time.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-brutalist-mono">STEEL REBAR</span>
                    <span className="font-brutalist-mono text-xs">GRADE 60</span>
                  </div>
                  <p className="font-brutalist-body text-sm">
                    Structural steel reinforcement for maximum load-bearing capacity.
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-display font-extrabold tracking-tight text-xl small:text-2xl mb-2">
                  FIT & SIZING
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-brutalist-mono">ERGONOMIC HANDLES</span>
                    <span className="font-brutalist-mono text-xs">ANTI-VIBRATION</span>
                  </div>
                  <p className="font-brutalist-body text-sm">
                    Reduced fatigue design for extended work sessions with superior grip comfort.
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-brutalist-mono">PROTECTIVE GEAR</span>
                    <span className="font-brutalist-mono text-xs">ANSI RATED</span>
                  </div>
                  <p className="font-brutalist-body text-sm">
                    Safety equipment meeting international protection standards for workplace compliance.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="btn-brutalist">
                EXPLORE PREMIUM COLLECTION
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedSplit
