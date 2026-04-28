import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { buildAlibabaAuthUrl, getAlibabaPublicConfig } from "../../../../lib/alibaba"

export const GET = async (_req: MedusaRequest, res: MedusaResponse) => {
  const config = getAlibabaPublicConfig()

  return res.json({
    alibaba: {
      ...config,
      authUrl: buildAlibabaAuthUrl("shamstools-admin-status"),
    },
  })
}
