import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUOTE_REQUEST_MODULE } from "../../../modules/quote-request";
import { ModuleCreateQuoteRequest } from "../../../types/quote-request/module";
import { StoreCreateQuoteRequestType } from "./validators";

async function nextDisplayId(
  quoteRequestService: {
    listQuoteRequests: (
      filters?: Record<string, unknown>,
      config?: { take?: number; order?: Record<string, string> }
    ) => Promise<{ display_id: number }[]>;
  }
) {
  const existing = await quoteRequestService.listQuoteRequests(
    {},
    { take: 1, order: { display_id: "DESC" } }
  );

  return (existing[0]?.display_id ?? 0) + 1;
}

export const POST = async (
  req: MedusaRequest<StoreCreateQuoteRequestType>,
  res: MedusaResponse
) => {
  const quoteRequestService = req.scope.resolve(QUOTE_REQUEST_MODULE);
  const body = req.validatedBody as ModuleCreateQuoteRequest;
  const displayId = await nextDisplayId(quoteRequestService);

  const [quoteRequest] = await quoteRequestService.createQuoteRequests([
    {
      display_id: displayId,
      status: "pending_merchant",
      first_name: body.first_name,
      last_name: body.last_name,
      company: body.company?.trim() || null,
      street_address: body.street_address,
      zip: body.zip,
      city: body.city,
      state: body.state,
      email: body.email.toLowerCase(),
      phone: body.phone,
      newsletter_opt_in: body.newsletter_opt_in ?? false,
      products: JSON.stringify(body.products),
    },
  ]);

  return res.status(201).json({ quote_request: quoteRequest });
};
