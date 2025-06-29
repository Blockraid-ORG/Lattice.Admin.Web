import { z } from "zod"
import { TResponseUser } from "@/schema/user"
import { TCategory } from "./category"
import { TChain } from "./chain"
import { TSocial } from "./social"
import { createProjectSchema } from "@/modules/projects/schema"


export type TFormProject = z.infer<typeof createProjectSchema>

type TAllocation = {
  id: string
  name: string
  supply: number,
  vesting: number
  startDate: string
  isPresale: boolean,
}
type TPresale = {
  id: string
  hardcap: string
  price: string
  maxContribution: string
  duration: string
  unit: string
}
export type TProject = {
  id: string
  name: string
  slug: string 
  logo: string 
  banner: string
  ticker: string
  decimals: number
  totalSupply: string
  detail: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "DEPLOYED",
  allocations: TAllocation[]
  user: TResponseUser
  socials: TSocial[],
  category: TCategory[]
  chains: {
    chain: TChain
  }[]
  Presales: TPresale[]
}
