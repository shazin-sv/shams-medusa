import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import Radio from "@/modules/common/components/radio"
import SquareMinus from "@/modules/common/icons/square-minus"
import SquarePlus from "@/modules/common/icons/square-plus"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

const CategoryList = ({
  categories,
  currentCategory,
}: {
  categories: HttpTypes.StoreProductCategory[]
  currentCategory?: HttpTypes.StoreProductCategory
}) => {
  const getCategoriesToExpand = useCallback(
    (category: HttpTypes.StoreProductCategory) => {
      const categoriesToExpand = [category.id]
      let current = category
      while (current.parent_category_id) {
        categoriesToExpand.push(current.parent_category_id)
        current = categories.find(
          (cat) => cat.id === current.parent_category_id
        ) as HttpTypes.StoreProductCategory
      }
      return categoriesToExpand
    },
    [categories]
  )

  const [expandedCategories, setExpandedCategories] = useState<string[]>(() =>
    currentCategory ? getCategoriesToExpand(currentCategory) : []
  )

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const isCurrentCategory = (handle: string) =>
    pathname.split("/").slice(2).join("/") === `categories/${handle}`

  useEffect(() => {
    if (currentCategory) {
      const categoriesToExpand = getCategoriesToExpand(currentCategory)
      setExpandedCategories((prev) => {
        const newCategories = categoriesToExpand.filter((cat) => !prev.includes(cat))
        return newCategories.length ? [...prev, ...newCategories] : prev
      })
    }
  }, [currentCategory, getCategoriesToExpand])

  const getCategoryMarginLeft = useCallback(
    (category: HttpTypes.StoreProductCategory) => {
      let level = 0
      let current = category
      while (current.parent_category_id) {
        level++
        current = categories.find(
          (cat) => cat.id === current.parent_category_id
        ) as HttpTypes.StoreProductCategory
      }
      return `${level * 14}px`
    },
    [categories]
  )

  const renderCategory = (category: HttpTypes.StoreProductCategory) => {
    const hasChildren = category.category_children.length > 0
    const isExpanded = expandedCategories.includes(category.id)
    const paddingLeft = getCategoryMarginLeft(category)

    return (
      <li key={category.id}>
        <div className="mb-2 flex items-center gap-2" style={{ paddingLeft }}>
          {hasChildren ? (
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <button onClick={() => toggleCategory(category.id)}>
                {isExpanded ? (
                  <SquareMinus className="mx-1 h-3" />
                ) : (
                  <SquarePlus className="mx-1 h-3" />
                )}
              </button>
              <LocalizedClientLink
                href={`/categories/${category.handle}${
                  searchParams.size ? `?${searchParams.toString()}` : ""
                }`}
                className="font-medium hover:text-slate-950"
              >
                {category.name} ({category.products?.length})
              </LocalizedClientLink>
            </div>
          ) : (
            <LocalizedClientLink
              href={`/categories/${category.handle}${
                searchParams.size ? `?${searchParams.toString()}` : ""
              }`}
              className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-950"
            >
              <Radio checked={isCurrentCategory(category.handle)} />
              {category.name} ({category.products?.length})
            </LocalizedClientLink>
          )}
        </div>
        {hasChildren && isExpanded && (
          <ul>
            {category.category_children.map((childId) => {
              const childCategory = categories.find((cat) => cat.id === childId.id)
              return childCategory ? renderCategory(childCategory) : null
            })}
          </ul>
        )}
      </li>
    )
  }

  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <Text className="text-sm font-bold text-slate-950">Categories</Text>
        {pathname.includes("/categories") && (
          <LocalizedClientLink href="/store" className="text-xs font-semibold text-slate-500 hover:text-slate-900">
            Clear
          </LocalizedClientLink>
        )}
      </div>
      <ul className="flex flex-col gap-3 p-4 text-sm text-slate-500">
        {categories
          .filter((cat) => cat.parent_category_id === null)
          .map(renderCategory)}
      </ul>
    </div>
  )
}

export default CategoryList
