import { z } from "zod"
import { formCategorySchema } from "@/modules/category/schema"


export type TFormCategory = z.infer<typeof formCategorySchema>

export type TCategory = {
  id: string
  name: string
  icon: string
  frequency: string
  description: string
  targetYield: string
}
