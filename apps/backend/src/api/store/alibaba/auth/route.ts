import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { buildAlibabaAuthUrl } from "../../../../lib/alibaba"

export const GET = async (_req: MedusaRequest, res: MedusaResponse) => {
  const authUrl = buildAlibabaAuthUrl("store-alibaba-auth")

  if (!authUrl) {
    return res.status(400).json({
      message: "Alibaba auth is not configured. Missing app key or callback URL.",
    })
  }

  return res.json({ authUrl })
}
