import { listCategories } from "@/lib/data/categories"
import { retrieveCustomer } from "@/lib/data/customer"
import SkeletonProductGrid from "@/modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@/modules/store/components/refinement-list"
import { SortOptions } from "@/modules/store/components/refinement-list/sort-products"
import StoreBreadcrumb from "@/modules/store/components/store-breadcrumb"
import PaginatedProducts from "@/modules/store/templates/paginated-products"
import { Metadata } from "next"
import { Suspense } from "react"

export const dynamicParams = true

export const metadata: Metadata = {
  title: "Store",
  description: "Explore all of our products.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { sortBy, page, q } = searchParams

  const sort = sortBy || "created_at"
  const pageNumber = page ? parseInt(page) : 1

  const categories = await listCategories()
  const customer = await retrieveCustomer()

  return (
    <div className="bg-slate-50 py-8 small:py-10">
      <div className="content-container space-y-6" data-testid="category-container">
        <StoreBreadcrumb />

        <section className="surface-card overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#d59a00]">
              Product catalog
            </div>
            <h1 className="mt-2 font-[Manrope] text-4xl font-extrabold tracking-[-0.05em] text-slate-950">
              Shop tools and materials
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">
              A cleaner grid, better filters and clearer card layout make this catalog feel more like a real industrial eCommerce store.
            </p>
          </div>

          <div className="flex flex-col gap-6 p-6 small:flex-row small:items-start">
            <RefinementList sortBy={sort} categories={categories} />
            <div className="min-w-0 flex-1">
              <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                  sortBy={sort}
                  page={pageNumber}
                  countryCode={params.countryCode}
                  customer={customer}
                  query={q}
                />
              </Suspense>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
