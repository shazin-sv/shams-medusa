import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import {
  exchangeAlibabaAuthorizationCode,
  getAlibabaPublicConfig,
} from "../../../../../lib/alibaba"
import { AdminAlibabaTokenExchangeType } from "../../validators"

export const GET = async (
  req: MedusaRequest<AdminAlibabaTokenExchangeType>,
  res: MedusaResponse
) => {
  try {
    const result = await exchangeAlibabaAuthorizationCode(req.validatedQuery.code)

    return res.json({
      ok: true,
      message: "Alibaba authorization code exchanged successfully",
      config: getAlibabaPublicConfig(),
      token: result,
      warning:
        "Persist this token securely in your backend secrets or database. It is not auto-saved yet.",
    })
  } catch (error: any) {
    return res.status(400).json({
      ok: false,
      message: "Failed to exchange Alibaba authorization code",
      error: error?.message || "Unknown error",
    })
  }
}
