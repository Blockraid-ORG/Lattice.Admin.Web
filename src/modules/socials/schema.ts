"use client"

import { z } from "zod"
export const formSocialSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  icon: z.string().min(1, { message: 'required' }),
})