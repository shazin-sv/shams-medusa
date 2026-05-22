import type {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from "@medusajs/framework";
import { SITE_SETTINGS_MODULE } from "../../../modules/site-settings";
import { getOrCreateSiteSettings } from "../../../utils/site-settings";
import { AdminUpdateSiteSettingsType } from "./validators";

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const siteSettings = await getOrCreateSiteSettings(req.scope);

  return res.json({ site_settings: siteSettings });
};

export const POST = async (
  req: AuthenticatedMedusaRequest<AdminUpdateSiteSettingsType>,
  res: MedusaResponse
) => {
  const siteSettingsService = req.scope.resolve(SITE_SETTINGS_MODULE);
  const current = await getOrCreateSiteSettings(req.scope);

  const result = await siteSettingsService.updateSiteSettings({
    id: current.id,
    unlocked: req.validatedBody.unlocked,
  });

  const updated = Array.isArray(result) ? result[0] : result;

  return res.json({ site_settings: updated });
};
