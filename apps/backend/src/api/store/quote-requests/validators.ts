import { z } from "zod";

const productLineSchema = z.object({
  link: z.string().min(1),
  quantity: z.string().min(1),
});

export type StoreCreateQuoteRequestType = z.infer<
  typeof StoreCreateQuoteRequest
>;

export const StoreCreateQuoteRequest = z
  .object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    company: z.string().optional(),
    street_address: z.string().min(1),
    zip: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    newsletter_opt_in: z.boolean().optional().default(false),
    products: z.array(productLineSchema).min(1),
  })
  .strict();
