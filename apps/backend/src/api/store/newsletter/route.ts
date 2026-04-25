import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../modules/newsletter";
import { ModuleCreateNewsletterSubscriber } from "../../../types/newsletter/module";

export const POST = async (
  req: AuthenticatedMedusaRequest<ModuleCreateNewsletterSubscriber>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const body = req.validatedBody;

  const existing = await newsletterService.listSubscribers({
    email: body.email,
  });

  let subscriber = existing?.[0];

  if (subscriber) {
    ;[subscriber] = await newsletterService.updateSubscribers({
      id: subscriber.id,
      first_name: body.first_name || subscriber.first_name,
      last_name: body.last_name || subscriber.last_name,
      source: body.source || subscriber.source,
      status: "subscribed",
    });
  } else {
    ;[subscriber] = await newsletterService.createSubscribers([
      {
        email: body.email,
        first_name: body.first_name || null,
        last_name: body.last_name || null,
        source: body.source || "storefront",
        status: "subscribed",
      },
    ]);
  }

  return res.json({
    subscriber,
  });
};
