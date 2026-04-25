"use client"

import { HttpTypes } from "@medusajs/types"
import { ChevronDown } from "lucide-react"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

const MegaMenu = ({
  categories,
}: {
  categories: HttpTypes.StoreProductCategory[]
}) => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const mainCategories = useMemo(
    () => categories.filter((category) => !category.parent_category_id),
    [categories]
  )

  const selectedCategory = mainCategories[0]

  const openMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    setIsOpen(true)
  }

  const closeMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }

    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 220)
  }

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const getSubCategories = (categoryId: string) => {
    return categories.filter((category) => category.parent_category_id === categoryId)
  }

  return (
    <div
      className="relative hidden large:block"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <LocalizedClientLink
        href="/store"
        className="nav-link inline-flex items-center gap-1"
      >
        Products
        <ChevronDown className="h-4 w-4" />
      </LocalizedClientLink>

      {isOpen && (
        <div
          className="absolute left-0 top-full z-50 pt-4"
          onMouseEnter={openMenu}
          onMouseLeave={closeMenu}
        >
          <div className="w-[860px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
            <div className="grid grid-cols-[220px_1fr]">
              <div className="border-r border-slate-200 bg-slate-50 p-5">
                <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-500">
                  Main categories
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  {mainCategories.map((category) => (
                    <LocalizedClientLink
                      key={category.id}
                      href={`/categories/${category.handle}`}
                      className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                        pathname.includes(category.handle)
                          ? "bg-slate-950 text-white"
                          : "bg-white text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      {category.name}
                    </LocalizedClientLink>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="section-heading mb-6">
                  <span className="section-kicker">Shop faster</span>
                  <h3 className="m-0 text-2xl font-extrabold tracking-[-0.04em] text-slate-950">
                    Browse industrial essentials by category
                  </h3>
                  <p className="m-0 max-w-2xl text-sm leading-7 text-slate-500">
                    Jump into your most-used categories and get to product pages with less friction.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {mainCategories.slice(0, 6).map((category) => {
                    const children = getSubCategories(category.id)

                    return (
                      <div key={category.id} className="rounded-3xl border border-slate-200 p-4">
                        <LocalizedClientLink
                          href={`/categories/${category.handle}`}
                          className="text-sm font-bold text-slate-950"
                        >
                          {category.name}
                        </LocalizedClientLink>
                        <div className="mt-3 flex flex-col gap-2">
                          {children.length > 0 ? (
                            children.slice(0, 4).map((child) => (
                              <LocalizedClientLink
                                key={child.id}
                                href={`/categories/${child.handle}`}
                                className="text-sm text-slate-500 hover:text-slate-900"
                              >
                                {child.name}
                              </LocalizedClientLink>
                            ))
                          ) : (
                            <p className="text-sm text-slate-500">
                              Browse products in {category.name.toLowerCase()}.
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f4b400]">
                    Quick route
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    Start with {selectedCategory?.name || "featured categories"} or head straight to the full product listing to compare prices and availability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MegaMenu
