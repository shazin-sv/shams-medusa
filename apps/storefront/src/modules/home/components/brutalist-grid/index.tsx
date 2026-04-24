const BrutalistGrid = () => {
  return (
    <section className="section-brutalist">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-brutalist-display text-3xl mb-4">
            FEATURED COLLECTIONS
          </h2>
          <p className="font-brutalist-body max-w-2xl mx-auto">
            Curated selections of premium tools and equipment for professional projects
          </p>
        </div>

        {/* 4-Column Grid with 1px borders */}
        <div className="grid-brutalist grid-cols-1 small:grid-cols-2 md:grid-cols-4 gap-px">
          {/* Column 1 */}
          <div className="space-y-8">
            <div className="aspect-[4/3] wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                POWER TOOLS
              </h3>
              <p className="font-brutalist-body text-sm">
                Professional-grade drilling and cutting equipment
              </p>
            </div>
            <div className="aspect-[4/3] wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                HAND TOOLS
              </h3>
              <p className="font-brutalist-body text-sm">
                Precision wrenches, hammers, and measuring tools
              </p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <div className="aspect-square wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                MEASURING
              </h3>
              <p className="font-brutalist-body text-sm">
                Digital levels, tape measures, and layout tools
              </p>
            </div>
            <div className="aspect-square wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                SAFETY GEAR
              </h3>
              <p className="font-brutalist-body text-sm">
                Protection equipment for workplace safety
              </p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-8">
            <div className="aspect-[3/4] wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                CONSTRUCTION
              </h3>
              <p className="font-brutalist-body text-sm">
                Building materials and heavy equipment
              </p>
            </div>
            <div className="aspect-[3/4] wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                AIR TOOLS
              </h3>
              <p className="font-brutalist-body text-sm">
                Compressors, nailers, and pneumatic equipment
              </p>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-8">
            <div className="aspect-[4/3] wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                ELECTRICAL
              </h3>
              <p className="font-brutalist-body text-sm">
                Wiring, lighting, and electrical components
              </p>
            </div>
            <div className="aspect-square wireframe-img" />
            <div className="p-6 space-y-4">
              <h3 className="font-brutalist-display text-lg mb-2">
                PLUMBING
              </h3>
              <p className="font-brutalist-body text-sm">
                Pipes, fittings, and drainage solutions
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="btn-brutalist">
            VIEW ALL CATEGORIES
          </button>
        </div>
      </div>
    </section>
  )
}

export default BrutalistGrid
