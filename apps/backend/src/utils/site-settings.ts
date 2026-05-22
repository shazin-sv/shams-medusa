import { SITE_SETTINGS_MODULE } from "../modules/site-settings";

type SiteSettingsService = {
  listSiteSettings: (
    filters?: Record<string, unknown>,
    config?: { take?: number }
  ) => Promise<{ id: string; unlocked: boolean }[]>;
  createSiteSettings: (
    data: { unlocked: boolean }[]
  ) => Promise<{ id: string; unlocked: boolean }[]>;
  updateSiteSettings: (data: {
    id: string;
    unlocked: boolean;
  }) => Promise<{ id: string; unlocked: boolean }[]>;
};

export async function getOrCreateSiteSettings(scope: {
  resolve: (key: string) => unknown;
}) {
  const siteSettingsService = scope.resolve(
    SITE_SETTINGS_MODULE
  ) as SiteSettingsService;

  const existing = await siteSettingsService.listSiteSettings({}, { take: 1 });

  if (existing[0]) {
    return existing[0];
  }

  const [created] = await siteSettingsService.createSiteSettings([
    { unlocked: false },
  ]);

  return created;
}
