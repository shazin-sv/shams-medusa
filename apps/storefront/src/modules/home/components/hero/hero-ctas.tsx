"use client"

import Button from "@/modules/common/components/button"
import LocalizedClientLink from "@/modules/common/components/localized-client-link"
import { RequestQuotePrompt } from "@/modules/quotes/components/request-quote-prompt"

const catalogMail =
  "mailto:contact@shamstools.com?subject=Full%20Catalog%20Request&body=Please%20send%20the%20full%20product%20catalog."

export function HeroCTAs() {
  return (
    <div className="flex flex-col small:flex-row flex-wrap items-center justify-center gap-3 w-full max-w-3xl px-4">
      <LocalizedClientLink href="/store">
        <Button variant="primary" className="min-w-[140px]">
          Shop Now
        </Button>
      </LocalizedClientLink>
      <a href={catalogMail}>
        <Button variant="secondary" className="min-w-[140px]">
          Download Full Catalog
        </Button>
      </a>
      <RequestQuotePrompt>
        <Button variant="secondary" className="min-w-[140px]">
          Request a Quote
        </Button>
      </RequestQuotePrompt>
      <LocalizedClientLink href="/#featured-products">
        <Button
          variant="transparent"
          className="min-w-[140px] !border !border-white/80 !text-white hover:!bg-white/10 !shadow-none"
        >
          View Online
        </Button>
      </LocalizedClientLink>
    </div>
  )
}
