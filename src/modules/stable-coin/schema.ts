"use client"

import { z } from "zod"
export const formStableCoinSchema = z.object({
  chainId: z.string().min(1, { message: 'required' }),
  stableCoinGroupId: z.string().min(1, { message: 'required' }),
  address: z.string().min(1, { message: 'required' }),
  decimal: z.coerce.number().min(1, { message: 'required' }),
})