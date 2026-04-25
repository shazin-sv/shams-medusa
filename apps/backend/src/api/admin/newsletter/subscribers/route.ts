import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../../modules/newsletter";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const subscribers = await newsletterService.listSubscribers({}, { take: 500 });

  return res.json({
    subscribers,
    count: subscribers.length,
    offset: 0,
    limit: subscribers.length,
  });
};
