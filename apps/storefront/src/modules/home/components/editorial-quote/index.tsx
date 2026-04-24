const EditorialQuote = () => {
  return (
    <section className="section-brutalist-gray">
      <div className="content-container text-center">
        {/* Quote Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto border-brutalist flex items-center justify-center">
            <span className="text-4xl font-bold">❝</span>
          </div>
        </div>

        {/* Large Quote Text */}
        <h2 className="font-brutalist-display text-6xl mb-8 max-w-4xl mx-auto leading-tight">
          &quot;Building Excellence is Not Just About Tools —<br />
          It&apos;s About the People Who Use Them&quot;
        </h2>

        {/* Horizontal Divider */}
        <div className="w-full max-w-md mx-auto h-px bg-brutalist-black mb-8"></div>

        {/* Quote Body */}
        <p className="font-brutalist-body text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          For over 15 years, Shams Tools has been the trusted partner for construction professionals across Saudi Arabia. 
          We believe that the right tools in the right hands don&apos;t just complete projects — they build careers, 
          strengthen communities, and shape the future of our industry.
        </p>

        {/* Call to Action */}
        <div className="flex items-center gap-6">
          <button className="btn-brutalist">
            READ OUR STORY
          </button>
          <div className="w-px h-px bg-brutalist-black flex-1"></div>
          <button className="btn-brutalist">
            MEET THE TEAM
          </button>
        </div>
      </div>
    </section>
  )
}

export default EditorialQuote
