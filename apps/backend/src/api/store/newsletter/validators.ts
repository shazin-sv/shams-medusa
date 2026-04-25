import { z } from "zod";

export type StoreSubscribeNewsletterType = z.infer<typeof StoreSubscribeNewsletter>;
export const StoreSubscribeNewsletter = z
  .object({
    email: z.string().email(),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    source: z.string().optional(),
  })
  .strict();
