import { formProjectTypeSchema } from "@/modules/project-type/schema"

export type TProjectType = {
  id: string
  name: string
  description: string
  icon: string
  order: number
}
export type TProjectTypeForm = z.infer<typeof formProjectTypeSchema>