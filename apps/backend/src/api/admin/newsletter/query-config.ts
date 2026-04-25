export const adminNewsletterSubscriberFields = [
  "id",
  "email",
  "first_name",
  "last_name",
  "status",
  "source",
  "created_at",
  "updated_at",
];

export const adminNewsletterCampaignFields = [
  "id",
  "subject",
  "preview_text",
  "html",
  "status",
  "sent_at",
  "created_at",
  "updated_at",
];

export const adminNewsletterSubscriberQueryConfig = {
  list: {
    defaults: adminNewsletterSubscriberFields,
    isList: true,
  },
  retrieve: {
    defaults: adminNewsletterSubscriberFields,
    isList: false,
  },
};

export const adminNewsletterCampaignQueryConfig = {
  list: {
    defaults: adminNewsletterCampaignFields,
    isList: true,
  },
  retrieve: {
    defaults: adminNewsletterCampaignFields,
    isList: false,
  },
};
