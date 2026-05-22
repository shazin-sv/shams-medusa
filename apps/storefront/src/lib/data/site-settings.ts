import { sdk } from "@/lib/config"

const FALLBACK_LOCKED = process.env.SITE_LOCKED_BY_DEFAULT !== "false"

export async function getSiteUnlocked(): Promise<boolean> {
  try {
    const data = await sdk.client.fetch<{ unlocked: boolean }>(
      `/store/site-settings`,
      {
        method: "GET",
        cache: "no-store",
      }
    )

    return !!data.unlocked
  } catch {
    return !FALLBACK_LOCKED ? true : false
  }
}
