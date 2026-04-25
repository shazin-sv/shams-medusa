import { validateAndTransformBody } from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import { StoreSubscribeNewsletter } from "./validators";

export const storeNewsletterMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/store/newsletter/subscribe",
    middlewares: [validateAndTransformBody(StoreSubscribeNewsletter)],
  },
];
