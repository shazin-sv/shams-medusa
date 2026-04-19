"use client"

import { useState } from "react"

type BrandCellProps = {
  name: string
  slug: string
}

export function BrandCell({ name, slug }: BrandCellProps) {
  const [useText, setUseText] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-[72px] px-4 py-3 bg-white border border-ui-border-base rounded-lg shadow-borders-base">
      {useText ? (
        <span className="txt-compact-small-plus text-ui-fg-base text-center tracking-tight">
          {name}
        </span>
      ) : (
        <img
          src={`/brands/${slug}.svg`}
          alt={name}
          className="max-h-8 max-w-[120px] w-auto object-contain object-center"
          onError={() => setUseText(true)}
        />
      )}
    </div>
  )
}
