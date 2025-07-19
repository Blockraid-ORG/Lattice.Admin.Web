import { approveMemberFormSchema, categoryMemberFormSchema, rejectMemberFormSchema, typeMemberFormSchema } from "@/modules/members/schema"
import z from "zod"
import { TRole } from "./role"
type VerificationStatus = {
  status: "PENDING" | "REJECTED" | "APPROVED"
}
export type TMemberVerificationLog = {
  id: string
  status: "PENDING" | "REJECTED" | "APPROVED"
  note?: string | null
  createdAt: string | null
  createdBy: string | null
}
export type TMemberVerfication = {
  idCard: string
  selfie: string
  bisnisLicense: string
  taxId: string
  submittedAt: string
  approvedAt: string
  status: "PENDING" | "REJECTED" | "APPROVED"
  rejectionReason?: string | null
  rejectedAt?: string
  logs: TMemberVerificationLog[]
}
export type TMember = {
  id: string
  fullname:string | null
  email: string | null,
  status: boolean,
  type: "PUBLIC" | "INTERNAL" | "PROJECT_OWNER",
  category: "PERSONAL" | "CORPORATE" | "UNSIGNED",
  verifications?: VerificationStatus[] | []
  roles: TRole[] | [],
  walletAddress: string | null
}
export type TMemberDetail = TMember & {
  verification?: TMemberVerfication
}

export type TFormChangeCategoryMember = z.infer<typeof categoryMemberFormSchema>
export type TFormChangeTypeMember = z.infer<typeof typeMemberFormSchema>
export type TFormRejectMember = z.infer<typeof rejectMemberFormSchema>
export type TFormApproveMember = z.infer<typeof approveMemberFormSchema>