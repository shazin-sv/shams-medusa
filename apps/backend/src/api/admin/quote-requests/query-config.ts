export const adminQuoteRequestFields = [
  "id",
  "display_id",
  "status",
  "first_name",
  "last_name",
  "company",
  "street_address",
  "zip",
  "city",
  "state",
  "email",
  "phone",
  "newsletter_opt_in",
  "products",
  "created_at",
  "updated_at",
];

export const adminQuoteRequestQueryConfig = {
  list: {
    defaults: adminQuoteRequestFields,
    isList: true,
  },
  retrieve: {
    defaults: adminQuoteRequestFields,
    isList: false,
  },
};
