export type QuoteRequestProductLine = {
  link: string;
  quantity: string;
};

export type ModuleQuoteRequest = {
  id: string;
  display_id: number;
  status: "pending_merchant" | "accepted" | "rejected";
  first_name: string;
  last_name: string;
  company: string | null;
  street_address: string;
  zip: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  newsletter_opt_in: boolean;
  products: string;
  created_at: Date;
  updated_at: Date;
};

export type ModuleCreateQuoteRequest = {
  first_name: string;
  last_name: string;
  company?: string | null;
  street_address: string;
  zip: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  newsletter_opt_in?: boolean;
  products: QuoteRequestProductLine[];
};
