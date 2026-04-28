import { validateAndTransformQuery } from "@medusajs/framework"
import { MiddlewareRoute } from "@medusajs/medusa"
import { AdminAlibabaAuthStart, AdminAlibabaTokenExchange } from "./validators"

export const adminAlibabaMiddlewares: MiddlewareRoute[] = [
  {
    method: ["GET"],
    matcher: "/admin/alibaba/auth/start",
    middlewares: [validateAndTransformQuery(AdminAlibabaAuthStart)],
  },
  {
    method: ["GET"],
    matcher: "/admin/alibaba/auth/callback",
    middlewares: [validateAndTransformQuery(AdminAlibabaTokenExchange)],
  },
]
