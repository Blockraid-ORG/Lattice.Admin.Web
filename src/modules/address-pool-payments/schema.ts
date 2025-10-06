"use client"

import { z } from "zod"
export const formMasterPaymentSchema = z.object({
  stableCoinId: z.string().min(1, { message: 'required' }),
  paymentSc : z.string(),
  listingFee: z.coerce.string(),
  presaleFee: z.coerce.number(),
})