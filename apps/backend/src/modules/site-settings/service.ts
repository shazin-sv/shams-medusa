import { MedusaService } from "@medusajs/framework/utils";
import { SiteSettings } from "./models";

class SiteSettingsModuleService extends MedusaService({
  SiteSettings,
}) {}

export default SiteSettingsModuleService;
