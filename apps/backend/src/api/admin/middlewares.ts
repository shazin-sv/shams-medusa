import { MiddlewareRoute } from "@medusajs/medusa";
import { adminCompaniesMiddlewares } from "./companies/middlewares";
import { adminQuotesMiddlewares } from "./quotes/middlewares";
import { adminApprovalsMiddlewares } from "./approvals/middlewares";
import { adminNewsletterMiddlewares } from "./newsletter/middlewares";
import { adminAlibabaMiddlewares } from "./alibaba/middlewares";
import { adminQuoteRequestMiddlewares } from "./quote-requests/middlewares";
import { adminSiteSettingsMiddlewares } from "./site-settings/middlewares";

export const adminMiddlewares: MiddlewareRoute[] = [
  ...adminCompaniesMiddlewares,
  ...adminQuotesMiddlewares,
  ...adminApprovalsMiddlewares,
  ...adminNewsletterMiddlewares,
  ...adminAlibabaMiddlewares,
  ...adminQuoteRequestMiddlewares,
  ...adminSiteSettingsMiddlewares,
];
