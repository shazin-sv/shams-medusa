"use client"

import { subscribeToNewsletter } from "@/lib/data/newsletter"
import ErrorMessage from "@/modules/checkout/components/error-message"
import Button from "@/modules/common/components/button"
import Input from "@/modules/common/components/input"
import { useState } from "react"

const Newsletter = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsSubmitting(true)
    setMessage(null)

    const formData = new FormData(event.currentTarget)
    const result = await subscribeToNewsletter(null, formData)

    if (result === "SUBSCRIBED") {
      setSubscribed(true)
      setMessage(null)
      event.currentTarget.reset()
    } else {
      setSubscribed(false)
      setMessage(result)
    }

    setIsSubmitting(false)
  }

  return (
    <section className="section-shell bg-white">
      <div className="content-container">
        <div className="surface-card flex flex-col justify-between gap-8 bg-slate-950 p-8 text-white large:flex-row large:items-center">
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#f4b400]">
              Newsletter
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-white">
              Get deals, product drops, and business offers in your inbox
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Subscribe for new arrivals, trade offers, seasonal promotions, and quote-friendly product highlights from Shamstools.
            </p>
          </div>

          <div className="w-full max-w-xl">
            {subscribed ? (
              <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                You are subscribed. We will send updates to your inbox.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 small:grid-cols-2">
                <Input
                  label="First name"
                  name="first_name"
                  className="!border-slate-700 !bg-slate-900 !text-white placeholder:!text-slate-400"
                />
                <Input
                  label="Last name"
                  name="last_name"
                  className="!border-slate-700 !bg-slate-900 !text-white placeholder:!text-slate-400"
                />
                <div className="small:col-span-2">
                  <Input
                    label="Email address"
                    name="email"
                    type="email"
                    required
                    className="!border-slate-700 !bg-slate-900 !text-white placeholder:!text-slate-400"
                  />
                </div>
                <div className="small:col-span-2 flex flex-col gap-3 small:flex-row small:items-center">
                  <Button className="h-11 px-6" disabled={isSubmitting}>
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                  <p className="text-xs leading-6 text-slate-400">
                    No spam, just practical offers and product updates.
                  </p>
                </div>
                <div className="small:col-span-2">
                  <ErrorMessage error={subscribed ? null : message} data-testid="newsletter-error" />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
