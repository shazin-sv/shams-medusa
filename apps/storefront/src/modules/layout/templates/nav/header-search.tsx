"use client"

import { searchProducts, SearchSuggestion } from "@/lib/data/search"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { Search, X } from "lucide-react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

type HeaderSearchProps = {
  placeholder?: string
}

export default function HeaderSearch({
  placeholder = "Search tools, hardware and materials",
}: HeaderSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()
  const countryCode = typeof params.countryCode === "string" ? params.countryCode : "us"

  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<SearchSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(searchParams.get("q") || "")
  }, [searchParams])

  useEffect(() => {
    const saved = window.localStorage.getItem("shamstools-recent-searches")
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved))
      } catch {
        setRecentSearches([])
      }
    }
  }, [])

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsLoading(false)
      return
    }

    const timeout = window.setTimeout(async () => {
      setIsLoading(true)

      try {
        const matches = await searchProducts(query, 6)
        setResults(matches)
      } catch {
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }, 250)

    return () => window.clearTimeout(timeout)
  }, [countryCode, query])

  const saveRecentSearch = (value: string) => {
    const trimmed = value.trim()

    if (!trimmed) return

    const updated = [trimmed, ...recentSearches.filter((item) => item !== trimmed)].slice(0, 5)
    setRecentSearches(updated)
    window.localStorage.setItem("shamstools-recent-searches", JSON.stringify(updated))
  }

  const submit = (value: string) => {
    const trimmed = value.trim()
    const currentPath = pathname || `/${countryCode}`
    const params = new URLSearchParams(searchParams.toString())
    const targetBase = currentPath.includes("/categories/") || currentPath.includes("/collections/") || currentPath.endsWith("/store")
      ? currentPath
      : `/${countryCode}/store`

    if (trimmed) {
      params.set("q", trimmed)
      params.delete("page")
      saveRecentSearch(trimmed)
    } else {
      params.delete("q")
    }

    const nextUrl = params.toString() ? `${targetBase}?${params.toString()}` : targetBase
    router.push(nextUrl)
    setIsOpen(false)
  }

  const recentVisible = useMemo(() => query.trim().length < 2 ? recentSearches : [], [query, recentSearches])

  return (
    <div className="relative flex w-full max-w-2xl" ref={wrapperRef}>
      <div className="flex w-full items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
        <Search className="mr-3 h-4 w-4 shrink-0" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit(query)
            if (e.key === "Escape") setIsOpen(false)
          }}
          className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
          placeholder={placeholder}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("")
              setResults([])
              submit("")
            }}
            className="mr-2 text-slate-400 hover:text-slate-700"
            aria-label="Clear search"
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => submit(query)}
          className="rounded-full bg-[#f4b400] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-950"
          type="button"
        >
          Search
        </button>
      </div>

      {isOpen && (query.trim().length >= 2 || recentVisible.length > 0) && (
        <div className="absolute top-[calc(100%+0.75rem)] z-[120] w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {isLoading ? (
            <div className="px-5 py-4 text-sm text-slate-500">Searching...</div>
          ) : results.length > 0 ? (
            <div>
              <div className="border-b border-slate-200 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Suggested products
              </div>
              <div className="divide-y divide-slate-100">
                {results.map((product) => (
                  <LocalizedClientLink
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="block px-5 py-4 transition hover:bg-slate-50"
                    onClick={() => {
                      saveRecentSearch(product.title)
                      setIsOpen(false)
                    }}
                  >
                    <div className="text-sm font-bold text-slate-950">{product.title}</div>
                    <div className="mt-1 line-clamp-1 text-sm text-slate-500">
                      {product.subtitle || product.description || "Open product details"}
                    </div>
                  </LocalizedClientLink>
                ))}
              </div>
              <button
                type="button"
                onClick={() => submit(query)}
                className="w-full border-t border-slate-200 px-5 py-4 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View all results for “{query.trim()}”
              </button>
            </div>
          ) : recentVisible.length > 0 ? (
            <div>
              <div className="border-b border-slate-200 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Recent searches
              </div>
              <div className="divide-y divide-slate-100">
                {recentVisible.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setQuery(item)
                      submit(item)
                    }}
                    className="w-full px-5 py-4 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-5 py-4 text-sm text-slate-500">No matching products found.</div>
          )}
        </div>
      )}
    </div>
  )
}
