import CategoryDivider from "@/modules/home/components/category-divider"
import CategoriesShowcase from "@/modules/home/components/categories-showcase"
import FeaturedProducts from "@/modules/home/components/featured-products"
import Hero from "@/modules/home/components/hero"
import Manifesto from "@/modules/home/components/manifesto"
import Newsletter from "@/modules/home/components/newsletter"
import SkeletonFeaturedProducts from "@/modules/skeletons/templates/skeleton-featured-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Shams Tools | Precision Engineered Tools & Materials — Jeddah, KSA",
  description:
    "Premium building materials and industrial tools for professionals. Precision engineered, built to last — Shams Tools, Jeddah, KSA.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  return (
    <div className="flex flex-col">
      <Hero />
      <Manifesto />
      <CategoriesShowcase />
      <CategoryDivider title="FEATURED" />
      <Suspense fallback={<SkeletonFeaturedProducts />}>
        <div id="featured-products">
          <FeaturedProducts countryCode={countryCode} />
        </div>
      </Suspense>
      <Newsletter />
    </div>
  )
}
