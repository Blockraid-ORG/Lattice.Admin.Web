"use client"

import { z } from "zod"
export const formProjectTypeSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  description: z.string().min(1, { message: 'required' }),
  icon: z.string().min(1, { message: 'required' }),
})