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

export const AdminExportNewsletterSubscribers = z
  .object({
    from: z.string().datetime().optional(),
    to: z.string().datetime().optional(),
  })
  .strict();
export type AdminExportNewsletterSubscribersType = z.infer<
  typeof AdminExportNewsletterSubscribers
>;

export const AdminDeleteNewsletterSubscriber = z
  .object({
    id: z.string(),
  })
  .strict();
export type AdminDeleteNewsletterSubscriberType = z.infer<
  typeof AdminDeleteNewsletterSubscriber
>;

export const AdminImportNewsletterSubscribers = z
  .object({
    subscribers: z
      .array(
        z
          .object({
            email: z.string().email(),
            first_name: z.string().optional().nullable(),
            last_name: z.string().optional().nullable(),
            source: z.string().optional().nullable(),
            status: z.enum(["subscribed", "unsubscribed"]).optional(),
          })
          .strict()
      )
      .min(1),
  })
  .strict();
export type AdminImportNewsletterSubscribersType = z.infer<
  typeof AdminImportNewsletterSubscribers
>;
