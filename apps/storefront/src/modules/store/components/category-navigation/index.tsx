import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import {
  Building,
  Droplet,
  Plug,
  Ruler,
  Shield,
  Wind,
  Wrench,
  Zap,
} from "lucide-react"

const CATEGORY_ICONS = {
  "Power Tools": Zap,
  "Hand Tools": Wrench,
  Measuring: Ruler,
  Safety: Shield,
  Plumbing: Droplet,
  Electrical: Plug,
  Construction: Building,
  "Air Tools": Wind,
}

type CategoryNavigationProps = {
  categories: HttpTypes.StoreProductCategory[]
}

export default function CategoryNavigation({ categories }: CategoryNavigationProps) {
  if (!categories?.length) {
    return null
  }

  return (
    <div className="grid grid-cols-2 gap-4 small:grid-cols-3 large:grid-cols-4">
      {categories
        .filter((category) => !category.parent_category_id)
        .slice(0, 8)
        .map((category) => {
          const IconComponent =
            CATEGORY_ICONS[category.name as keyof typeof CATEGORY_ICONS] || Wrench

          return (
            <LocalizedClientLink
              key={category.id}
              href={`/categories/${category.handle}`}
              className="group surface-card flex min-h-[220px] flex-col justify-between p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-300"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4b400]/15 text-slate-950">
                <IconComponent size={24} />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-950">{category.name}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
                  {category.description || `Browse products in ${category.name.toLowerCase()}.`}
                </p>
                <div className="mt-4 text-sm font-semibold text-[#d59a00] transition group-hover:text-slate-950">
                  Explore category
                </div>
              </div>
            </LocalizedClientLink>
          )
        })}
    </div>
  )
}
