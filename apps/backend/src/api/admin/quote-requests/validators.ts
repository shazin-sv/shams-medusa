import { createFindParams } from "@medusajs/medusa/api/utils/validators";
import { z } from "zod";

export const AdminGetQuoteRequestParams = createFindParams({
  limit: 50,
  offset: 0,
});

export type AdminGetQuoteRequestParamsType = z.infer<
  typeof AdminGetQuoteRequestParams
>;
