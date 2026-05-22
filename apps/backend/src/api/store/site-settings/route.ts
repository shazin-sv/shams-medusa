import type { MedusaRequest, MedusaResponse } from "@medusajs/framework";
import { getOrCreateSiteSettings } from "../../../utils/site-settings";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const settings = await getOrCreateSiteSettings(req.scope);

  return res.json({
    unlocked: settings.unlocked,
  });
};
