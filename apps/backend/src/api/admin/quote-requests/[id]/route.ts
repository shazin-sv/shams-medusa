import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUOTE_REQUEST_MODULE } from "../../../../modules/quote-request";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const quoteRequestService = req.scope.resolve(QUOTE_REQUEST_MODULE);
  const { id } = req.params;

  const quoteRequest = await quoteRequestService.retrieveQuoteRequest(id);

  return res.json({ quote_request: quoteRequest });
};
