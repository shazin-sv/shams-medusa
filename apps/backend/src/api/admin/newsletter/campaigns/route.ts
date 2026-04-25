import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../../modules/newsletter";
import {
  AdminCreateNewsletterCampaignType,
  AdminUpdateNewsletterCampaignType,
} from "../validators";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const campaigns = await newsletterService.listCampaigns({}, { take: 100 });

  return res.json({
    campaigns,
    count: campaigns.length,
    offset: 0,
    limit: campaigns.length,
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

export const PUT = async (
  req: AuthenticatedMedusaRequest<AdminUpdateNewsletterCampaignType>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const body = req.validatedBody;

  const [campaign] = await newsletterService.updateCampaigns({
    id: (req.body as { id: string }).id,
    ...(body.subject !== undefined ? { subject: body.subject } : {}),
    ...(body.preview_text !== undefined ? { preview_text: body.preview_text || null } : {}),
    ...(body.html !== undefined ? { html: body.html } : {}),
    ...(body.status !== undefined ? { status: body.status } : {}),
  });

  return res.json({ campaign });
};
