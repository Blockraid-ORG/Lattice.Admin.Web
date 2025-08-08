import z from "zod";

export const categoryMemberFormSchema = z.object({
  userId: z.string().min(1, { message: 'required' }),
  category: z.enum(['PERSONAL', 'CORPORATE','UNSIGNED']),
})
export const typeMemberFormSchema = z.object({
  userId: z.string().min(1, { message: 'required' }),
  type: z.enum(['PROJECT_OWNER', 'PUBLIC', 'INTERNAL']),
})

export const rejectMemberFormSchema = z.object({
  userId: z.string().min(1, { message: 'required' }),
  rejectionReason: z.string().min(1, { message: 'required' }),
})
export const approveMemberFormSchema = z.object({
  userId: z.string().min(1, { message: 'required' }),
})