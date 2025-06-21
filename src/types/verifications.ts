import { formVerificationSchema } from "@/modules/verification/schema"
import { z } from "zod"


export type TFormVerification = z.infer<typeof formVerificationSchema>

export type TVerification = {
  id:string
  name: string
  type: string,
  IDCardRequired: boolean,
  SelfieRequired: boolean,
  BussinessLicenseRequired: boolean,
  TaxIdRequired: boolean
}
