import AboutSection from "@/modules/home/components/about-section"
import CategoriesShowcase from "@/modules/home/components/categories-showcase"
import ContactSection from "@/modules/home/components/contact-section"
import FeaturedProducts from "@/modules/home/components/featured-products"
import Hero from "@/modules/home/components/hero"
import PartnerBrands from "@/modules/home/components/partner-brands"
import QuoteRequestForm from "@/modules/home/components/quote-request-form"
import ValueProposition from "@/modules/home/components/value-proposition"
import SkeletonFeaturedProducts from "@/modules/skeletons/templates/skeleton-featured-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Shams Tools | Building Materials & Industrial Tools — Jeddah, KSA",
  description:
    "Your first choice for building materials and industrial tools in Saudi Arabia. Premium quality, extensive range, expert support — Shams Tools, Jeddah.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  return (
    <div className="flex flex-col gap-y-0 m-2">
      <Hero />
      <Suspense fallback={<SkeletonFeaturedProducts />}>
        <div id="featured-products">
          <FeaturedProducts countryCode={countryCode} />
        </div>
      </Suspense>
      <AboutSection />
      <CategoriesShowcase />
      <ValueProposition />
      <PartnerBrands />
      <QuoteRequestForm />
      <ContactSection />
    </div>
  )
}
