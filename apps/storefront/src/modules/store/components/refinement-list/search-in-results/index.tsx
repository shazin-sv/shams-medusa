"use client"

import { MagnifyingGlassMini } from "@medusajs/icons"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

const SearchInResults = ({ listName }: { listName?: string }) => {
  const placeholder = listName ? `Search in ${listName}` : "Search in products"
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [value, setValue] = useState(searchParams.get("q") || "")

  const submit = () => {
    const params = new URLSearchParams(searchParams.toString())
    const trimmed = value.trim()

    if (trimmed) {
      params.set("q", trimmed)
      params.delete("page")
    } else {
      params.delete("q")
    }

    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
    router.push(nextUrl)
  }

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit()
        }}
        className="form-control bg-white pr-10 text-sm text-slate-700 placeholder:text-slate-400"
      />
      <button
        type="button"
        onClick={submit}
        className="absolute inset-y-0 right-0 flex items-center pr-4"
        aria-label="Search in results"
      >
        <MagnifyingGlassMini className="h-4 w-4 text-slate-400" />
      </button>
    </div>
  )
}

export default SearchInResults
