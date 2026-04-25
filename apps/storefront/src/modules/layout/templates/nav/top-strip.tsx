"use client"

import { ShieldCheck, Truck } from "lucide-react"
import { useEffect, useState } from "react"

export default function TopStrip() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < 40)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`hidden overflow-hidden border-b border-slate-800 bg-slate-950 text-white transition-all duration-200 small:block ${
        visible ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="content-container flex min-h-9 items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-200">
        <span className="inline-flex items-center gap-2">
          <ShieldCheck className="h-3.5 w-3.5 text-[#f4b400]" />
          PLEASE WAIT FOR OUR LAUNCH
        </span>
        <span className="inline-flex items-center gap-2">
          <Truck className="h-3.5 w-3.5 text-[#f4b400]" />
          CURRENTLY IN DEVELOPMENT (BETA)
        </span>
      </div>
    </div>
  )
}
