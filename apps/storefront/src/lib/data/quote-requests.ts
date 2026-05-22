"use server"

import { sdk } from "@/lib/config"

export type QuoteRequestProductLine = {
  link: string
  quantity: string
}

export type SubmitQuoteRequestInput = {
  first_name: string
  last_name: string
  company?: string
  street_address: string
  zip: string
  city: string
  state: string
  email: string
  phone: string
  newsletter_opt_in: boolean
  products: QuoteRequestProductLine[]
}

export async function submitQuoteRequest(
  input: SubmitQuoteRequestInput
): Promise<{ success: true } | { success: false; message: string }> {
  try {
    await sdk.client.fetch(`/store/quote-requests`, {
      method: "POST",
      body: input,
    })

    return { success: true }
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit quote request. Please try again."

    if (message.includes("404") || message.toLowerCase().includes("not found")) {
      return {
        success: false,
        message:
          "Quote request endpoint is not available. Restart the Medusa backend after running migrations.",
      }
    }

    return { success: false, message }
  }
}
