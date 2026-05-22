import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { QUOTE_REQUEST_MODULE } from "../../../modules/quote-request";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const quoteRequestService = req.scope.resolve(QUOTE_REQUEST_MODULE);
  const { skip, take } = req.remoteQueryConfig.pagination ?? {
    skip: 0,
    take: 50,
  };

  const [quoteRequests, count] = await quoteRequestService.listAndCountQuoteRequests(
    {},
    {
      skip: skip ?? 0,
      take: take ?? 50,
      order: { created_at: "DESC" },
    }
  );

  return res.json({
    quote_requests: quoteRequests,
    count,
    offset: skip ?? 0,
    limit: take ?? 50,
  });
};
