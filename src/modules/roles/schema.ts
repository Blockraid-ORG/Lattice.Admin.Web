"use client"

import { z } from "zod"
export const formRoleSchema = z.object({
  name: z.string().min(1, {
    message: 'required'
  }),
  code: z.string().min(1, {
    message: 'required'
  })
})