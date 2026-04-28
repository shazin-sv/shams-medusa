import { z } from "zod"

export const AdminAlibabaAuthStart = z.object({
  state: z.string().trim().min(1).optional(),
})

export const AdminAlibabaTokenExchange = z.object({
  code: z.string().trim().min(1),
  state: z.string().trim().min(1).optional(),
})

export type AdminAlibabaAuthStartType = z.infer<typeof AdminAlibabaAuthStart>
export type AdminAlibabaTokenExchangeType = z.infer<typeof AdminAlibabaTokenExchange>
