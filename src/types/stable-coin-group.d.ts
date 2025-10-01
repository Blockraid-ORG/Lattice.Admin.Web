import { formSTCGroupSchema } from "@/modules/stable-coin-group/schema"
import { z } from "zod"


export type TFormSTCGroup = z.infer<typeof formSTCGroupSchema>

export type TSTCGroup = {
  id: string
  name: string
}
