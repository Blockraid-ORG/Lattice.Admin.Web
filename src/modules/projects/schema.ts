"use client"

import { z } from "zod"
export const allocationSchema = z.object({
  name: z.string().min(1),
  supply: z.number().nonnegative(),
  vesting: z.number().int().nonnegative(),
  startDate: z.coerce.date(),
  isPresale: z.boolean(),
});

export const socialSchema = z.object({
  socialId: z.string().uuid(),
  url: z.string().url(),
});

export const presaleSchema = z.object({
  chainId: z.string().uuid(),
  hardcap: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Hardcap must be a valid number string',
  }),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Price must be a valid number string',
  }),
  maxContribution: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Max contribution must be a valid number string',
  }),
  duration: z.coerce.date(),
  unit: z.string().min(1),
});

export const createProjectSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  logo: z.string().min(1),
  banner: z.string().min(1),
  ticker: z.string().min(1),
  decimals: z.number().int().nonnegative(),
  totalSupply: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Total supply must be a valid number string',
  }),
  detail: z.string().min(1),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  categoryId: z.string().uuid(),
  chainIds: z.array(z.string().uuid()),
  allocations: z.array(allocationSchema).nonempty(),
  socials: z.array(socialSchema).optional(),
  presales: presaleSchema.optional(),
});
