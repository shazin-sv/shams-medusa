import { validateAndTransformBody } from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import { AdminUpdateSiteSettings } from "./validators";

export const adminSiteSettingsMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/admin/site-settings",
    middlewares: [validateAndTransformBody(AdminUpdateSiteSettings)],
  },
];
