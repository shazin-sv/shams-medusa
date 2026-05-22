import { validateAndTransformBody } from "@medusajs/framework";
import { MiddlewareRoute } from "@medusajs/medusa";
import { StoreCreateQuoteRequest } from "./validators";

export const storeQuoteRequestMiddlewares: MiddlewareRoute[] = [
  {
    method: ["POST"],
    matcher: "/store/quote-requests",
    middlewares: [validateAndTransformBody(StoreCreateQuoteRequest)],
  },
];
