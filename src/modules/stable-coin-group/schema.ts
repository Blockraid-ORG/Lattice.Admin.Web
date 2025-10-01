"use client"

import { z } from "zod"
export const formSTCGroupSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
})