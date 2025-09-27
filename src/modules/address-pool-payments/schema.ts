"use client"

import { z } from "zod"
export const formMasterPaymentSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  address: z.string(),
  ticker: z.string(),
  amountFee: z.string(),
  decimal: z.coerce.number(),
})