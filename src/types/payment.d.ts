import { formMasterPaymentSchema } from "@/modules/address-pool-payments/schema"
import { z } from "zod"


export type TFormMasterPayment = z.infer<typeof formMasterPaymentSchema>

export type TMasterPayment = {
  id: string
  name: string
  address: string
  balance: string
  ticker: string
  decimal: number
  amountFee: string,
}
