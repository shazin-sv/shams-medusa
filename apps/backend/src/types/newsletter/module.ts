export type ModuleNewsletterSubscriber = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: "subscribed" | "unsubscribed";
  source: string | null;
  created_at: Date;
  updated_at: Date;
};

export type ModuleCreateNewsletterSubscriber = {
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  source?: string | null;
  status?: "subscribed" | "unsubscribed";
};

export interface ModuleUpdateNewsletterSubscriber
  extends Partial<ModuleNewsletterSubscriber> {
  id: string;
}

export type ModuleNewsletterCampaign = {
  id: string;
  subject: string;
  preview_text: string | null;
  html: string;
  status: "draft" | "sending" | "sent" | "failed";
  sent_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type ModuleCreateNewsletterCampaign = {
  subject: string;
  preview_text?: string | null;
  html: string;
  status?: "draft" | "sending" | "sent" | "failed";
  sent_at?: Date | null;
};

export interface ModuleUpdateNewsletterCampaign
  extends Partial<ModuleNewsletterCampaign> {
  id: string;
}
