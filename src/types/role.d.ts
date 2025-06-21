import { z } from "zod"
import { formRoleSchema } from "@/schema/role"

export type TFormRole = z.infer<typeof formRoleSchema>
export type TFormUpdateRole = { id?: string } & TFormRole

type TPermission = {
  id: string
  permission: {
    id: string
    name: string
    code: string
  }
}
export type TMenuRole = {
  menuId: string
  menu: {
    id: string
    title: string
    isGroup: boolean
    icon?: string | null
    path?: string | null
    parentId: string | null
    order: number
  }
}
export type TRole = {
  id: string
  name: string
  code: string
  menus: TMenuRole[] | []
  permissions: TPermission[] | []
}
