"use client"

import { z } from "zod"
export const formVerificationSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  type: z.string(),
  IDCardRequired: z.boolean(),
  SelfieRequired: z.boolean(),
  BussinessLicenseRequired: z.boolean(),
  TaxIdRequired: z.boolean(),
})