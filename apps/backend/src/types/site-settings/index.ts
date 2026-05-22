export type ModuleSiteSettings = {
  id: string;
  unlocked: boolean;
  created_at: Date;
  updated_at: Date;
};

export type StoreSiteSettingsResponse = {
  unlocked: boolean;
};

export type AdminSiteSettingsResponse = {
  site_settings: ModuleSiteSettings;
};

export type AdminUpdateSiteSettings = {
  unlocked: boolean;
};
