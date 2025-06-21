"use client"

import { z } from "zod"
export const formCategorySchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  icon: z.string(),
  frequency: z.string(),
  description: z.string(),
  targetYield: z.string(),
})