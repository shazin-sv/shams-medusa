import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import {
  createAlibabaCallbackRecord,
  getAlibabaPublicConfig,
  verifyAlibabaSignature,
} from "../../../../lib/alibaba"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const config = getAlibabaPublicConfig()

  return res.json({
    ok: true,
    message: "Alibaba callback endpoint is reachable",
    config,
    query: req.query,
  })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = (req.query || {}) as Record<string, unknown>
  const body = req.body || null
  const headers = req.headers || {}
  const signatureValid = verifyAlibabaSignature(query)

  const callback = createAlibabaCallbackRecord(query, body, headers)

  return res.status(202).json({
    ok: true,
    accepted: true,
    signature_valid: signatureValid,
    callback,
  })
}
