import { model } from "@medusajs/framework/utils";

export const Campaign = model.define("newsletter_campaign", {
  id: model
    .id({
      prefix: "ncmp",
    })
    .primaryKey(),
  subject: model.text(),
  preview_text: model.text().nullable(),
  html: model.text(),
  status: model.enum(["draft", "sending", "sent", "failed"]).default("draft"),
  sent_at: model.dateTime().nullable(),
});
