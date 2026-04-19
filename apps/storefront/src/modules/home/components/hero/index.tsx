import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"

import { HeroCTAs } from "@/modules/home/components/hero/hero-ctas"

const stats = [
  { label: "Years in KSA", value: "15+" },
  { label: "Products", value: "10,000+" },
  { label: "Happy Clients", value: "5,000+" },
]

const Hero = () => {
  return (
    <div className="h-[75vh] min-h-[520px] w-full border-b border-ui-border-base relative bg-neutral-900">
      <Image
        src="/hero-image.jpg"
        alt="Shams Tools — building materials and industrial tools in Jeddah, KSA"
        fill
        className="object-cover opacity-90"
        quality={100}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/30 z-[1]" />
      <div className="absolute inset-0 z-[2] flex flex-col justify-center items-center text-center small:p-32 gap-8 px-4 py-12">
        <p className="text-white/90 text-xs uppercase tracking-[0.2em]">
          Your First Choice for Building Materials and Industrial Tools
        </p>

        <Heading
          level="h1"
          className="text-4xl small:text-6xl leading-tight text-white font-semibold mt-2 mb-2 max-w-4xl"
        >
          Shams Tools
        </Heading>

        <Text className="leading-relaxed text-white/95 font-normal text-base small:text-lg max-w-2xl">
          Empowering Construction Excellence — Shams Tools, the Best Retailer in
          KSA!
        </Text>

        <ul className="flex flex-col small:flex-row gap-6 small:gap-12 text-white mt-2">
          {stats.map((s) => (
            <li key={s.label} className="flex flex-col gap-1">
              <span className="text-3xl small:text-4xl font-light tabular-nums">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-wider text-white/75">
                {s.label}
              </span>
            </li>
          ))}
        </ul>

        <HeroCTAs />
      </div>
    </div>
  )
}

export default Hero
