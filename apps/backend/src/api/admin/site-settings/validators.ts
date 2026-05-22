import { z } from "zod";

export const AdminUpdateSiteSettings = z
  .object({
    unlocked: z.boolean(),
  })
  .strict();

export type AdminUpdateSiteSettingsType = z.infer<
  typeof AdminUpdateSiteSettings
>;
