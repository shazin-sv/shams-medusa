import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../../modules/newsletter";
import {
  AdminDeleteNewsletterSubscriberType,
  AdminImportNewsletterSubscribersType,
} from "../validators";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const subscribers = await newsletterService.listSubscribers({}, { take: 500 });

  return res.json({
    subscribers,
    count: subscribers.length,
    offset: 0,
    limit: subscribers.length,
  });
};

export const DELETE = async (
  req: AuthenticatedMedusaRequest<AdminDeleteNewsletterSubscriberType>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);

  await newsletterService.deleteSubscribers([req.validatedBody.id]);

  return res.json({ id: req.validatedBody.id, deleted: true });
};

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminImportNewsletterSubscribersType>,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const incoming = req.validatedBody.subscribers;

  const imported = [] as any[];

  for (const entry of incoming) {
    const existing = await newsletterService.listSubscribers({
      email: entry.email,
    });

    let subscriber = existing?.[0];

    if (subscriber) {
      ;[subscriber] = await newsletterService.updateSubscribers({
        id: subscriber.id,
        first_name: entry.first_name ?? subscriber.first_name,
        last_name: entry.last_name ?? subscriber.last_name,
        source: entry.source ?? subscriber.source,
        status: entry.status ?? subscriber.status,
      });
    } else {
      ;[subscriber] = await newsletterService.createSubscribers([
        {
          email: entry.email,
          first_name: entry.first_name ?? null,
          last_name: entry.last_name ?? null,
          source: entry.source ?? "admin-import",
          status: entry.status ?? "subscribed",
        },
      ]);
    }

    imported.push(subscriber);
  }

  return res.json({
    subscribers: imported,
    count: imported.length,
  });
};
