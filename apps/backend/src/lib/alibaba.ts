import crypto from "node:crypto"

type AlibabaCallbackRecord = {
  received_at: string
  query: Record<string, unknown>
  body: unknown
  headers: Record<string, string | string[] | undefined>
}

type ForwardAlibabaOrderInput = {
  orderId: string
  displayId?: string | number | null
  email?: string | null
  currencyCode?: string | null
  total?: number | null
  shippingAddress?: Record<string, unknown> | null
  items: Array<{
    id?: string
    title?: string
    quantity?: number
    sku?: string | null
    metadata?: Record<string, unknown> | null
  }>
  metadata?: Record<string, unknown> | null
}

const redact = (value?: string | null) => {
  if (!value) {
    return null
  }

  if (value.length <= 8) {
    return "***"
  }

  return `${value.slice(0, 4)}***${value.slice(-4)}`
}

export const getAlibabaConfig = () => {
  const rawCallbackBase = process.env.ALIBABA_CALLBACK_URL || process.env.MEDUSA_BACKEND_URL || ""
  const callbackUrl = rawCallbackBase
    ? rawCallbackBase.includes("/alibaba/callback")
      ? rawCallbackBase
      : `${rawCallbackBase.replace(/\/$/, "")}/alibaba/callback`
    : ""

  return {
    appKey: process.env.ALIBABA_APP_KEY || "",
    appSecret: process.env.ALIBABA_APP_SECRET || "",
    callbackUrl,
    apiBaseUrl: process.env.ALIBABA_API_BASE_URL || "https://eco.taobao.com/router/rest",
    accessToken: process.env.ALIBABA_ACCESS_TOKEN || "",
  }
}

export const getAlibabaPublicConfig = () => {
  const config = getAlibabaConfig()

  return {
    configured: Boolean(config.appKey && config.appSecret),
    callbackUrl: config.callbackUrl,
    apiBaseUrl: config.apiBaseUrl,
    appKeyPreview: redact(config.appKey),
    accessTokenPreview: redact(config.accessToken),
  }
}

export const verifyAlibabaSignature = (params: Record<string, unknown>) => {
  const { sign, ...rest } = params
  const { appSecret } = getAlibabaConfig()

  if (!sign || typeof sign !== "string" || !appSecret) {
    return false
  }

  const sorted = Object.keys(rest)
    .filter((key) => rest[key] !== undefined && rest[key] !== null)
    .sort()
    .map((key) => `${key}${String(rest[key])}`)
    .join("")

  const raw = `${appSecret}${sorted}${appSecret}`
  const digest = crypto.createHash("md5").update(raw, "utf8").digest("hex").toUpperCase()

  return digest === sign.toUpperCase()
}

export const buildAlibabaAuthUrl = (state?: string) => {
  const config = getAlibabaConfig()

  if (!config.appKey || !config.callbackUrl) {
    return null
  }

  const url = new URL("https://oauth.alibaba.com/authorize")
  url.searchParams.set("response_type", "code")
  url.searchParams.set("client_id", config.appKey)
  url.searchParams.set("redirect_uri", config.callbackUrl)

  if (state) {
    url.searchParams.set("state", state)
  }

  return url.toString()
}

export const createAlibabaCallbackRecord = (
  query: Record<string, unknown>,
  body: unknown,
  headers: Record<string, string | string[] | undefined>
): AlibabaCallbackRecord => ({
  received_at: new Date().toISOString(),
  query,
  body,
  headers,
})

export const exchangeAlibabaAuthorizationCode = async (code: string) => {
  const config = getAlibabaConfig()

  if (!config.appKey || !config.appSecret || !config.callbackUrl) {
    throw new Error("Alibaba auth is not configured with app key, app secret, and callback URL")
  }

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.appKey,
    client_secret: config.appSecret,
    redirect_uri: config.callbackUrl,
    code,
  })

  const response = await fetch("https://oauth.alibaba.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error_description || data?.message || `Alibaba token exchange failed with status ${response.status}`)
  }

  return data
}

export const forwardAlibabaOrder = async (input: ForwardAlibabaOrderInput) => {
  const config = getAlibabaConfig()

  if (!config.accessToken || !config.appKey || !config.appSecret) {
    return {
      ok: false,
      mode: "not_configured" as const,
      message: "Alibaba credentials are not configured yet",
    }
  }

  const supplierItems = input.items
    .filter((item) => item.metadata?.alibaba_offer_id)
    .map((item) => ({
      order_line_id: item.id,
      title: item.title,
      quantity: item.quantity,
      sku: item.sku,
      alibaba_offer_id: item.metadata?.alibaba_offer_id,
      alibaba_sku_id: item.metadata?.alibaba_sku_id,
    }))

  if (!supplierItems.length) {
    return {
      ok: false,
      mode: "skipped" as const,
      message: "Order has no Alibaba-linked line items",
    }
  }

  return {
    ok: true,
    mode: "manual_review_required" as const,
    message: "Alibaba-linked items detected. Automatic supplier order submission is not implemented yet.",
    payload: {
      order_id: input.orderId,
      display_id: input.displayId,
      email: input.email,
      currency_code: input.currencyCode,
      total: input.total,
      shipping_address: input.shippingAddress,
      items: supplierItems,
    },
  }
}
