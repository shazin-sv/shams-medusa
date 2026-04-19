"use client"

import Button from "@/modules/common/components/button"
import { Heading, Label, Text } from "@medusajs/ui"
import { useState } from "react"

const projectTypes = [
  "Construction",
  "Renovation",
  "Industrial",
  "Maintenance",
  "Other",
]

export default function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get("name") || "")
    const company = String(data.get("company") || "")
    const projectType = String(data.get("projectType") || "")
    const products = String(data.get("products") || "")
    const timeline = String(data.get("timeline") || "")
    const location = String(data.get("location") || "")

    const body = [
      `Name: ${name}`,
      `Company: ${company}`,
      `Project type: ${projectType}`,
      ``,
      `Products / list:`,
      products,
      ``,
      `Timeline: ${timeline}`,
      `Location: ${location}`,
    ].join("\n")

    const mailto = `mailto:contact@shamstools.com?subject=${encodeURIComponent(
      `Quote request — ${company.trim() || name.trim()}`
    )}&body=${encodeURIComponent(body)}`

    window.location.href = mailto
    setStatus("sent")
  }

  return (
    <section
      className="content-container py-16 small:py-24"
      id="quote-request"
      aria-labelledby="quote-heading"
    >
      <Heading
        id="quote-heading"
        level="h2"
        className="text-2xl small:text-3xl text-ui-fg-base font-medium mb-4"
      >
        Request a Quote
      </Heading>
      <Text className="text-ui-fg-subtle text-sm mb-8 max-w-2xl">
        Tell us about your project. Include your name and company, project
        type, product list, timeline, and location. We will respond as soon as
        possible.
      </Text>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl flex flex-col gap-y-5 border border-ui-border-base rounded-lg p-6 small:p-8 bg-white shadow-borders-base"
      >
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-name" className="txt-compact-small-plus">
            Full name
          </Label>
          <input
            id="qr-name"
            name="name"
            required
            autoComplete="name"
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-company" className="txt-compact-small-plus">
            Company details
          </Label>
          <input
            id="qr-company"
            name="company"
            required
            autoComplete="organization"
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm"
            placeholder="Company name, CR / VAT if applicable"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-type" className="txt-compact-small-plus">
            Project type
          </Label>
          <select
            id="qr-type"
            name="projectType"
            required
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">Select type</option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-products" className="txt-compact-small-plus">
            List of products
          </Label>
          <textarea
            id="qr-products"
            name="products"
            required
            rows={4}
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm resize-y min-h-[100px]"
            placeholder="SKUs, quantities, or descriptions"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-timeline" className="txt-compact-small-plus">
            Project timeline
          </Label>
          <input
            id="qr-timeline"
            name="timeline"
            required
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm"
            placeholder="e.g. Q2 2026, or project duration"
          />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label htmlFor="qr-location" className="txt-compact-small-plus">
            Project location
          </Label>
          <input
            id="qr-location"
            name="location"
            required
            className="w-full border border-ui-border-base rounded-md px-3 py-2 text-sm"
            placeholder="City, site, or region"
          />
        </div>

        <Button type="submit" variant="primary" className="w-full small:w-auto mt-2">
          Send quote request
        </Button>

        {status === "sent" && (
          <Text className="text-ui-fg-subtle text-sm">
            Your email app should open with this request. If nothing happens,
            email{" "}
            <a
              className="underline text-ui-fg-base"
              href="mailto:contact@shamstools.com"
            >
              contact@shamstools.com
            </a>{" "}
            directly.
          </Text>
        )}
      </form>
    </section>
  )
}
