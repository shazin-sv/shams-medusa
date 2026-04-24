"use client"

import { HttpTypes } from "@medusajs/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import SearchInResults from "./search-in-results"
import SortProducts, { SortOptions } from "./sort-products"
import CategoryList from "./category-list"

type RefinementListProps = {
  sortBy: SortOptions
  listName?: string
  "data-testid"?: string
  categories?: HttpTypes.StoreProductCategory[]
  currentCategory?: HttpTypes.StoreProductCategory
}

const RefinementList = ({
  sortBy,
  listName,
  "data-testid": dataTestId,
  categories,
  currentCategory,
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(name, value)
    router.push(`${pathname}?${query}`)
  }

  return (
    <aside className="flex w-full flex-col gap-4 small:w-[280px] small:shrink-0">
      <div className="surface-card overflow-hidden">
        <div className="border-b border-slate-200 px-5 py-4">
          <div className="text-sm font-bold text-slate-950">Refine products</div>
          <p className="mt-1 text-sm text-slate-500">Sort results and browse categories faster.</p>
        </div>
        <div className="p-4">
          <SearchInResults listName={listName} />
          <div className="mt-3">
            <SortProducts
              sortBy={sortBy}
              setQueryParams={setQueryParams}
              data-testid={dataTestId}
            />
          </div>
        </div>
      </div>
      {categories && (
        <CategoryList categories={categories} currentCategory={currentCategory} />
      )}
    </aside>
  )
}

export default RefinementList
