import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { buildAlibabaAuthUrl } from "../../../../../lib/alibaba"
import { AdminAlibabaAuthStartType } from "../../validators"

export const GET = async (
  req: MedusaRequest<AdminAlibabaAuthStartType>,
  res: MedusaResponse
) => {
  const authUrl = buildAlibabaAuthUrl(req.validatedQuery.state)

  if (!authUrl) {
    return res.status(400).json({
      message: "Alibaba auth is not configured. Missing app key or callback URL.",
    })
  }

  return res.json({ authUrl })
}
