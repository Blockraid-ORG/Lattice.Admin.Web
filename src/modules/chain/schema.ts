"use client"

import { z } from "zod"
export const formChainSchema = z.object({
  name: z.string().min(1, {
    message: 'required'
  }),
  logo: z.string().optional(),
  ticker: z.string(),
  type: z.string(),
  urlScanner: z.string().optional(),
})