import { model } from "@medusajs/framework/utils";

export const Subscriber = model.define("newsletter_subscriber", {
  id: model
    .id({
      prefix: "nsub",
    })
    .primaryKey(),
  email: model.text().unique(),
  first_name: model.text().nullable(),
  last_name: model.text().nullable(),
  status: model.enum(["subscribed", "unsubscribed"]).default("subscribed"),
  source: model.text().nullable(),
});
