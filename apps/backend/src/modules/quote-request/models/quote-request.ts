import { model } from "@medusajs/framework/utils";

export const QuoteRequest = model.define("quote_request", {
  id: model.id({ prefix: "qreq" }).primaryKey(),
  display_id: model.number(),
  status: model
    .enum(["pending_merchant", "accepted", "rejected"])
    .default("pending_merchant"),
  first_name: model.text(),
  last_name: model.text(),
  company: model.text().nullable(),
  street_address: model.text(),
  zip: model.text(),
  city: model.text(),
  state: model.text(),
  email: model.text(),
  phone: model.text(),
  newsletter_opt_in: model.boolean().default(false),
  products: model.text(),
});
