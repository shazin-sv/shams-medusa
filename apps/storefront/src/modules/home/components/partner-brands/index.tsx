"use client"

const brands = [
  {
    name: "DeWalt",
    logo: "https://logodownload.org/wp-content/uploads/2019/11/dewalt-logo-2.png",
  },
  {
    name: "Pattex",
    logo: "https://www.henkel.com/resource/image/26250/1x1/1000/1000/73555d2fa62630c235f09ef3cafcc20/CE3B8CCBA21DD180564F59EA1EBB78B2/pattex-logo.webp",
  },
  {
    name: "Stanley",
    logo: "https://banner2.cleanpng.com/20180503/ocw/avdpszis7.webp",
  },
  {
    name: "Total Tools",
    logo: "https://d2j6dbq0eux0bg.cloudfront.net/images/29199629/4835182478.jpg",
  },
  {
    name: "Soudal",
    logo: "https://soudal.co.nz/wp-content/uploads/Soudal-RGB.png",
  },
  {
    name: "Bosch",
    logo: "https://www.citypng.com/public/uploads/preview/bosch-black-logo-hd-png-701751694709018wuhaqxxtwk.png",
  },
  {
    name: "Hilti",
    logo: "https://cdn.salla.sa/jKbqz/3I7kZBEoM6QbsF0JUM9F4mivegHt2nx8Tbtrv3xi.png",
  },
  {
    name: "Metabo",
    logo: "https://brandlogos.net/wp-content/uploads/2021/08/metabo-logo_brandlogos.net_rjqbb.png",
  },
  {
    name: "Super Ego",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlk9uPihQv5WKJHccEkpInwPF3hutS4F08JQ&s",
  },
  {
    name: "APT",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwoMjKyAaliMZh2Edvv6mZSp62PAybb7mmOg&s",
  },
]

const PartnerBrands = () => {
  const doubled = [...brands, ...brands]

  return (
    <section
      className="bg-white border-b border-black py-12 overflow-hidden"
      aria-label="Our Partner Brands"
    >
      {/* Section heading - Brutalist style */}
      <div className="content-container mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em]">
            Trusted Partners
          </span>
        </div>
        <h2 className="font-display text-3xl small:text-4xl font-extrabold tracking-tight">
          Brands We Work With
        </h2>
      </div>

      {/* Carousel track */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <div className="brand-carousel-track">
          {doubled.map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="brand-carousel-item"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-10 max-w-[130px] w-auto object-contain"
                onError={(e) => {
                  const target = e.currentTarget
                  const parent = target.parentElement
                  if (parent) {
                    parent.innerHTML = `<span class="font-mono text-xs uppercase tracking-widest">${brand.name}</span>`
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PartnerBrands