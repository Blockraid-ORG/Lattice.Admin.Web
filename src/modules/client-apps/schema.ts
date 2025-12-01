"use client"

import { z } from "zod"
export const formClientAppSchema = z.object({
  name: z.string().min(1, {
    message: 'required'
  }),
  code: z.string().min(1, {
    message: 'required'
  }),
  url: z.string().min(1, {
    message: 'required'
  }),
  description: z.string().optional().nullable()
})