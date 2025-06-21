
import PermissionContainer from "@/components/permission-container";
import { Button } from "@/components/ui/button";
import { TRole } from "@/types/role";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";

export const columns: ColumnDef<TRole>[] = [
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission='GET_roles'>
            <Button size={'sm'} asChild>
              <Link href={`/roles/set-permission?roleId=${row.original.id}`}>Sign Permissions</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission='GET_roles'>
            <Button size={'sm'} asChild>
              <Link href={`/roles/set-menu?roleId=${row.original.id}`}>Sign Menu</Link>
            </Button>
          </PermissionContainer>
          <PermissionContainer permission='PATCH_roles/:id'>
            <FormSubmit data={{ ...row.original }} />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_roles/:id'>
            <ConfirmDelete id={row.original.id} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

