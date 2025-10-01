import { formChainSchema } from "@/modules/chain/schema"
import { z } from "zod"


export type TFormChain = z.infer<typeof formChainSchema>

export type TChain = {
  id: string
  name: string
  aliasName: string
  ticker: string
  logo: string
  urlScanner: string
  type: string
  urlScanner: string | null
  chainid: number,
  urlApi: string | null,
  urlRpc: string | null
}
