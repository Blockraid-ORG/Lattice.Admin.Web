import {
  approveFormSchema,
  createProjectSchema,
  rejectFormSchema
} from "@/modules/projects/schema"
import { z } from "zod"
import { TCategory } from "./category"
import { TChain } from "./chain"
import { TSocial } from "./social"


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
type TProjectOwner = {
  id: string
  fullname:  string
  walletAddress: string | null,
  verifications: { status: string }[]
}

export type TProjectReviewLog = {
  id: string
  status: string
  note?: string
  createdAt: string
  createdBy: string
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
  socials: {
    url: string,
    social: TSocial
  }[],
  presales: TPresale,
  category: TCategory
  chains: {
    chain: TChain
  }[]
  Presales: TPresale[]
  user: TProjectOwner
  reviewLogs: TReviewLog[]
}

export type TRejectForm = z.infer<typeof rejectFormSchema>
export type TApproveForm = z.infer<typeof approveFormSchema>
