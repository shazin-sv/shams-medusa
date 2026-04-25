import { createSelectParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";

export const AdminGetNewsletterSubscriberParams = createSelectParams();
export type AdminGetNewsletterSubscriberParamsType = z.infer<
  typeof AdminGetNewsletterSubscriberParams
>;

export const AdminGetNewsletterCampaignParams = createSelectParams();
export type AdminGetNewsletterCampaignParamsType = z.infer<
  typeof AdminGetNewsletterCampaignParams
>;

export const AdminCreateNewsletterCampaign = z
  .object({
    subject: z.string().min(1),
    preview_text: z.string().optional(),
    html: z.string().min(1),
  })
  .strict();
export type AdminCreateNewsletterCampaignType = z.infer<
  typeof AdminCreateNewsletterCampaign
>;

export const AdminUpdateNewsletterCampaign = z
  .object({
    subject: z.string().min(1).optional(),
    preview_text: z.string().optional().nullable(),
    html: z.string().min(1).optional(),
    status: z.enum(["draft", "sending", "sent", "failed"]).optional(),
  })
  .strict();
export type AdminUpdateNewsletterCampaignType = z.infer<
  typeof AdminUpdateNewsletterCampaign
>;

export const AdminSendNewsletterCampaign = z
  .object({
    test_email: z.string().email().optional(),
    recipients: z.array(z.string().email()).optional(),
  })
  .strict();
export type AdminSendNewsletterCampaignType = z.infer<
  typeof AdminSendNewsletterCampaign
>;
