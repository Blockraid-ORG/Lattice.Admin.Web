import { formStableCoinSchema } from "@/modules/stable-coin/schema"
import { z } from "zod"
import { TChain } from "./chain"
import { TSTCGroup } from "./stable-coin-group"


export type TFormStableCoin = z.infer<typeof formStableCoinSchema>

export type TStableCoin = {
  id: string
  address: string
  decimal: number
  chain: TChain
  stableCoin: TSTCGroup
}
