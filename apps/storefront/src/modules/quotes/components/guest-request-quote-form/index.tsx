"use client"

import {
  submitQuoteRequest,
  type QuoteRequestProductLine,
} from "@/lib/data/quote-requests"
import { US_STATES } from "@/modules/quotes/constants/us-states"
import { Plus } from "@medusajs/icons"
import { useState } from "react"

type ProductRow = QuoteRequestProductLine

const emptyRow = (): ProductRow => ({ link: "", quantity: "" })

const inputClass =
  "w-full border border-[#c5c5c5] bg-white px-3 py-2 text-sm text-black outline-none focus:border-[#0078C1]"

const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-black"

function RequiredMark() {
  return <span className="text-red-600"> *</span>
}

export default function GuestRequestQuoteForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  )
  const [errorMessage, setErrorMessage] = useState("")
  const [products, setProducts] = useState<ProductRow[]>([
    emptyRow(),
    emptyRow(),
    emptyRow(),
    emptyRow(),
  ])

  const addProductRow = () => {
    setProducts((rows) => [...rows, emptyRow()])
  }

  const updateProductRow = (
    index: number,
    field: keyof ProductRow,
    value: string
  ) => {
    setProducts((rows) =>
      rows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    setErrorMessage("")

    const form = e.currentTarget
    const data = new FormData(form)

    const filledProducts = products.filter(
      (row) => row.link.trim() && row.quantity.trim()
    )

    if (!filledProducts.length) {
      setStatus("error")
      setErrorMessage("Add at least one product link and quantity.")
      return
    }

    const result = await submitQuoteRequest({
      first_name: String(data.get("first_name") || "").trim(),
      last_name: String(data.get("last_name") || "").trim(),
      company: String(data.get("company") || "").trim() || undefined,
      street_address: String(data.get("street_address") || "").trim(),
      zip: String(data.get("zip") || "").trim(),
      city: String(data.get("city") || "").trim(),
      state: String(data.get("state") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      newsletter_opt_in: data.get("newsletter_opt_in") === "on",
      products: filledProducts,
    })

    if (!result.success) {
      setStatus("error")
      setErrorMessage(result.message)
      return
    }

    setStatus("success")
    form.reset()
    setProducts([emptyRow(), emptyRow(), emptyRow(), emptyRow()])
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-3xl border border-[#c5c5c5] bg-white p-10 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wide text-black">
          Quote submitted
        </h2>
        <p className="mt-4 text-sm leading-7 text-gray-700">
          Thank you. Our team will review your request and respond within two
          business days.
        </p>
        <button
          type="button"
          className="mt-8 bg-[#0078C1] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white"
          onClick={() => setStatus("idle")}
        >
          Submit another quote
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl border border-[#c5c5c5] bg-white p-6 small:p-10"
    >
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-black small:text-4xl">
          Request a Quote
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-800">
          We offer volume discounts for bulk orders and freight quotes for
          equipment. Complete the form below with part numbers and quantities
          for a custom quote.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-800">
          Our team reviews every request and responds within two business days.
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-wide text-red-600">
          Customer support hours: Monday – Friday 9:00 AM – 5:00 PM CT
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 small:grid-cols-2">
        <div>
          <label htmlFor="first_name" className={labelClass}>
            First Name
            <RequiredMark />
          </label>
          <input
            id="first_name"
            name="first_name"
            required
            className={inputClass}
            autoComplete="given-name"
          />
        </div>
        <div>
          <label htmlFor="last_name" className={labelClass}>
            Last Name
            <RequiredMark />
          </label>
          <input
            id="last_name"
            name="last_name"
            required
            className={inputClass}
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="company" className={labelClass}>
          Company
        </label>
        <input id="company" name="company" className={inputClass} />
      </div>

      <div className="mt-4">
        <label htmlFor="street_address" className={labelClass}>
          Street Address
          <RequiredMark />
        </label>
        <input
          id="street_address"
          name="street_address"
          required
          className={inputClass}
          autoComplete="street-address"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 small:grid-cols-3">
        <div>
          <label htmlFor="zip" className={labelClass}>
            ZIP code
            <RequiredMark />
          </label>
          <input
            id="zip"
            name="zip"
            required
            className={inputClass}
            autoComplete="postal-code"
          />
        </div>
        <div>
          <label htmlFor="city" className={labelClass}>
            City
            <RequiredMark />
          </label>
          <input
            id="city"
            name="city"
            required
            className={inputClass}
            autoComplete="address-level2"
          />
        </div>
        <div>
          <label htmlFor="state" className={labelClass}>
            State
            <RequiredMark />
          </label>
          <select
            id="state"
            name="state"
            required
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>
              Select state
            </option>
            {US_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 small:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
            <RequiredMark />
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone Number
            <RequiredMark />
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClass}
            autoComplete="tel"
          />
        </div>
      </div>

      <label className="mt-4 flex items-center gap-2 text-sm text-gray-800">
        <input
          type="checkbox"
          name="newsletter_opt_in"
          defaultChecked
          className="h-4 w-4 accent-[#0078C1]"
        />
        Email me with news and offers
      </label>

      <div className="mt-10">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-black">
          Select Products
        </h2>
        <div className="mb-2 grid grid-cols-[1fr_120px] gap-3 text-xs font-bold uppercase tracking-wide text-black">
          <span>Product Link</span>
          <span>Quantity</span>
        </div>
        <div className="flex flex-col gap-3">
          {products.map((row, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_120px] gap-3"
            >
              <input
                type="url"
                placeholder="https://..."
                value={row.link}
                onChange={(e) =>
                  updateProductRow(index, "link", e.target.value)
                }
                className={inputClass}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Qty"
                value={row.quantity}
                onChange={(e) =>
                  updateProductRow(index, "quantity", e.target.value)
                }
                className={inputClass}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addProductRow}
          className="mt-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#0078C1]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0078C1] text-white">
            <Plus />
          </span>
          Add more products
        </button>
      </div>

      {status === "error" && errorMessage && (
        <p className="mt-6 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 w-full bg-[#0078C1] py-4 text-sm font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Submit Quote"}
      </button>
    </form>
  )
}
