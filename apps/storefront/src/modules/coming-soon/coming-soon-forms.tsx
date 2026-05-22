"use client"

import { subscribeToNewsletter } from "@/lib/data/newsletter"
import {
  submitQuoteRequest,
  type QuoteRequestProductLine,
} from "@/lib/data/quote-requests"
import { Plus } from "@medusajs/icons"
import styles from "./coming-soon.module.css"
import { useState } from "react"

type ProductRow = QuoteRequestProductLine

const emptyRow = (): ProductRow => ({ link: "", quantity: "" })

export function ComingSoonNewsletterForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    const result = await subscribeToNewsletter(null, new FormData(e.currentTarget))

    if (result === "SUBSCRIBED") {
      setStatus("success")
      e.currentTarget.reset()
      return
    }

    setStatus("error")
    setMessage(result)
  }

  return (
    <div className={styles.formCard}>
      <h2>Newsletter</h2>
      <p className={styles.subtitle} style={{ margin: "0 0 12px" }}>
        Get deals and updates when we launch.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="first_name"
          placeholder="First name (optional)"
        />
        <input
          className={styles.input}
          name="email"
          type="email"
          required
          placeholder="Email address *"
        />
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "success" && (
        <p className={`${styles.message} ${styles.messageSuccess}`}>
          You are subscribed. Thank you!
        </p>
      )}
      {status === "error" && message && (
        <p className={`${styles.message} ${styles.messageError}`}>{message}</p>
      )}
    </div>
  )
}

export function ComingSoonQuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  )
  const [message, setMessage] = useState("")
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
    setStatus("loading")
    setMessage("")

    const data = new FormData(e.currentTarget)
    const filledProducts = products.filter(
      (row) => row.link.trim() && row.quantity.trim()
    )

    if (!filledProducts.length) {
      setStatus("error")
      setMessage("Add at least one product link and quantity.")
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
      newsletter_opt_in: true,
      products: filledProducts,
    })

    if (result.success) {
      setStatus("success")
      e.currentTarget.reset()
      setProducts([emptyRow(), emptyRow(), emptyRow(), emptyRow()])
      return
    }

    setStatus("error")
    setMessage(result.message)
  }

  return (
    <div className={styles.formCard} id="quote-form">
      <h2>Request a Quote</h2>
      <p className={styles.subtitle} style={{ margin: "0 0 12px" }}>
        No account needed — we will email you back.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <input className={styles.input} name="first_name" required placeholder="First name *" />
          <input className={styles.input} name="last_name" required placeholder="Last name *" />
        </div>
        <input className={styles.input} name="company" placeholder="Company" />
        <input className={styles.input} name="email" type="email" required placeholder="Email *" />
        <input className={styles.input} name="phone" required placeholder="Phone *" />
        <input className={styles.input} name="street_address" required placeholder="Street address *" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          <input className={styles.input} name="city" required placeholder="City *" />
          <input className={styles.input} name="state" required placeholder="State *" />
          <input className={styles.input} name="zip" required placeholder="ZIP *" />
        </div>

        <p className={styles.productSectionTitle}>Select Products</p>
        <div className={styles.productHeader}>
          <span>Product Link</span>
          <span>Quantity</span>
        </div>
        <div className={styles.productRows}>
          {products.map((row, index) => (
            <div key={index} className={styles.productRow}>
              <input
                type="url"
                placeholder="https://..."
                value={row.link}
                onChange={(e) =>
                  updateProductRow(index, "link", e.target.value)
                }
                className={styles.input}
                style={{ marginBottom: 0 }}
              />
              <input
                type="text"
                inputMode="numeric"
                placeholder="Qty"
                value={row.quantity}
                onChange={(e) =>
                  updateProductRow(index, "quantity", e.target.value)
                }
                className={styles.input}
                style={{ marginBottom: 0 }}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addProductRow}
          className={styles.addMoreBtn}
        >
          <span className={styles.addMoreIcon}>
            <Plus />
          </span>
          Add more products
        </button>

        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={status === "loading"}
          style={{ marginTop: 16 }}
        >
          {status === "loading" ? "Sending..." : "Submit Quote"}
        </button>
      </form>
      {status === "success" && (
        <p className={`${styles.message} ${styles.messageSuccess}`}>
          Quote request received. We will contact you soon.
        </p>
      )}
      {status === "error" && message && (
        <p className={`${styles.message} ${styles.messageError}`}>{message}</p>
      )}
    </div>
  )
}
