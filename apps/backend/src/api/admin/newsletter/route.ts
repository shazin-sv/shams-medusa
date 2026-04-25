import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../modules/newsletter";
import { AdminCreateNewsletterCampaignType } from "./validators";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const { fields, pagination } = req.queryConfig;

  const [subscribers, campaigns] = await Promise.all([
    newsletterService.listSubscribers({}, { take: 500, select: fields }),
    newsletterService.listCampaigns({}, { take: 100, select: fields }),
  ]);

  return res.json({
    subscribers,
    campaigns,
    count: subscribers.length,
    campaigns_count: campaigns.length,
    offset: pagination?.skip || 0,
    limit: pagination?.take || 0,
  });
};

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminCreateNewsletterCampaignType>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);

  const [campaign] = await newsletterService.createCampaigns([
    {
      subject: req.validatedBody.subject,
      preview_text: req.validatedBody.preview_text || null,
      html: req.validatedBody.html,
      status: "draft",
    },
  ]);

  return res.json({ campaign });
};
