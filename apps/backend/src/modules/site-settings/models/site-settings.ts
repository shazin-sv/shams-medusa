import { model } from "@medusajs/framework/utils";

export const SiteSettings = model.define("site_settings", {
  id: model.id({ prefix: "sset" }).primaryKey(),
  unlocked: model.boolean().default(false),
});
