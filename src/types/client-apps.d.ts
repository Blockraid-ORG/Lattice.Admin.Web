import { formClientAppSchema } from "@/modules/client-apps/schema"
import { z } from "zod"


export type TFormClientApps = z.infer<typeof formClientAppSchema>

export type TClientApps = {
  id: string
  name: string
  code: string
  url: string
  description?: string | null
}
