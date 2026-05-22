import { validateAndTransformQuery } from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import { adminQuoteRequestQueryConfig } from "./query-config";
import { AdminGetQuoteRequestParams } from "./validators";

export const adminQuoteRequestMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/quote-requests",
    middlewares: [
      validateAndTransformQuery(
        AdminGetQuoteRequestParams,
        adminQuoteRequestQueryConfig.list
      ),
    ],
  },
  {
    method: ["GET"],
    matcher: "/admin/quote-requests/:id",
    middlewares: [
      validateAndTransformQuery(
        AdminGetQuoteRequestParams,
        adminQuoteRequestQueryConfig.retrieve
      ),
    ],
  },
];
