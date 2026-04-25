import type { AuthenticatedMedusaRequest, MedusaResponse } from "@medusajs/framework";
import { NEWSLETTER_MODULE } from "../../../../../modules/newsletter";

function normalizeDate(value?: string) {
  return value ? new Date(value) : undefined;
}

function csvEscape(value: unknown) {
  const text = String(value ?? "");

  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }

  return text;
}

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const newsletterService = req.scope.resolve(NEWSLETTER_MODULE);
  const from = normalizeDate(req.query.from as string | undefined);
  const to = normalizeDate(req.query.to as string | undefined);

  const subscribers = await newsletterService.listSubscribers({}, { take: 5000 });
  const filtered = subscribers.filter((subscriber: any) => {
    const createdAt = new Date(subscriber.created_at);

    if (from && createdAt < from) {
      return false;
    }

    if (to && createdAt > to) {
      return false;
    }

    return true;
  });

  const rows = [
    ["email", "first_name", "last_name", "status", "source", "created_at"],
    ...filtered.map((subscriber: any) => [
      subscriber.email,
      subscriber.first_name ?? "",
      subscriber.last_name ?? "",
      subscriber.status ?? "",
      subscriber.source ?? "",
      subscriber.created_at ?? "",
    ]),
  ];

  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv"`
  );

  return res.send(csv);
};
