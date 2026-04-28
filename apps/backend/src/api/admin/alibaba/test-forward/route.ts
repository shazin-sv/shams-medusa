import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { forwardAlibabaOrder } from "../../../../lib/alibaba"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const result = await forwardAlibabaOrder({
    orderId: "manual-test",
    displayId: "manual-test",
    email: typeof req.body?.email === "string" ? req.body.email : null,
    currencyCode: typeof req.body?.currency_code === "string" ? req.body.currency_code : null,
    total: typeof req.body?.total === "number" ? req.body.total : null,
    shippingAddress: req.body?.shipping_address || null,
    metadata: req.body?.metadata || null,
    items: Array.isArray(req.body?.items) ? req.body.items : [],
  })

  return res.status(result.ok ? 200 : 400).json(result)
}
