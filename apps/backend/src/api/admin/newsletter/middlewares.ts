import {
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import {
  adminNewsletterCampaignQueryConfig,
  adminNewsletterSubscriberQueryConfig,
} from "./query-config";
import {
  AdminCreateNewsletterCampaign,
  AdminDeleteNewsletterSubscriber,
  AdminGetNewsletterCampaignParams,
  AdminGetNewsletterSubscriberParams,
  AdminImportNewsletterSubscribers,
  AdminSendNewsletterCampaign,
  AdminUpdateNewsletterCampaign,
} from "./validators";

export const adminNewsletterMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/newsletter/subscribers",
    middlewares: [
      validateAndTransformQuery(
        AdminGetNewsletterSubscriberParams,
        adminNewsletterSubscriberQueryConfig.list
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/newsletter/campaigns",
    middlewares: [
      validateAndTransformQuery(
        AdminGetNewsletterCampaignParams,
        adminNewsletterCampaignQueryConfig.list
      ),
    ],
  },
  {
    method: ["POST"],
    matcher: "/admin/newsletter/campaigns",
    middlewares: [
      validateAndTransformBody(AdminCreateNewsletterCampaign),
      validateAndTransformQuery(
        AdminGetNewsletterCampaignParams,
        adminNewsletterCampaignQueryConfig.retrieve
      ),
    ],
  },
  {
    method: ["PUT"],
    matcher: "/admin/newsletter/campaigns",
    middlewares: [validateAndTransformBody(AdminUpdateNewsletterCampaign)],
  },
  {
    method: ["POST"],
    matcher: "/admin/newsletter/campaigns/:id/send",
    middlewares: [validateAndTransformBody(AdminSendNewsletterCampaign)],
  },
  {
    method: ["POST"],
    matcher: "/admin/newsletter/subscribers/import",
    middlewares: [validateAndTransformBody(AdminImportNewsletterSubscribers)],
  },
  {
    method: ["DELETE"],
    matcher: "/admin/newsletter/subscribers",
    middlewares: [validateAndTransformBody(AdminDeleteNewsletterSubscriber)],
  },
];
