import { PaginatedResponse } from "@medusajs/types";

export type AdminNewsletterSubscriber = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  status: "subscribed" | "unsubscribed";
  source: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminNewsletterCampaign = {
  id: string;
  subject: string;
  preview_text: string | null;
  html: string;
  status: "draft" | "sending" | "sent" | "failed";
  sent_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdminNewsletterSubscribersResponse = PaginatedResponse<{
  subscribers: AdminNewsletterSubscriber[];
}>;

export type AdminNewsletterSubscriberResponse = {
  subscriber: AdminNewsletterSubscriber;
};

export type AdminNewsletterCampaignsResponse = PaginatedResponse<{
  campaigns: AdminNewsletterCampaign[];
}>;

export type AdminNewsletterCampaignResponse = {
  campaign: AdminNewsletterCampaign;
};

export type StoreNewsletterSubscribeRequest = {
  email: string;
  first_name?: string;
  last_name?: string;
  source?: string;
};
