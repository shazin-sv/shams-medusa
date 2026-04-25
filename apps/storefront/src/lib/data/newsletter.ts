"use server"

import { sdk } from "@/lib/config"

export async function subscribeToNewsletter(_currentState: unknown, formData: FormData) {
  const email = (formData.get("email") as string)?.trim()
  const first_name = (formData.get("first_name") as string)?.trim()
  const last_name = (formData.get("last_name") as string)?.trim()

  if (!email) {
    return "Email is required"
  }

  try {
    await sdk.client.fetch(`/store/newsletter/subscribe`, {
      method: "POST",
      body: {
        email,
        first_name: first_name || undefined,
        last_name: last_name || undefined,
        source: "home-newsletter",
      },
    })

    return "SUBSCRIBED"
  } catch (error: any) {
    const message = error?.message || error?.toString?.() || "Failed to subscribe to newsletter"

    if (message.includes("404") || message.toLowerCase().includes("not found")) {
      return "Newsletter subscription endpoint is not available on the backend yet."
    }

    return message
  }
}
