import PermissionContainer from "@/components/permission-container";
import { TClientApps } from "@/types/client-apps";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
import Link from "next/link";
export const columns: ColumnDef<TClientApps>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'code',
    header: 'Code',
  },
  {
    accessorKey: 'url',
    header: 'Urls',
    cell: ({ row }) => {
      return (
          <Link className="line-clamp-1" href={'/'} target="_blank" rel="noopener noreferrer">
            {row.original.url ?? "-"}
          </Link>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission='PATCH_chains/:id'>
            <FormSubmit data={{ ...row.original }} />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_chains/:id'>
            <ConfirmDelete id={row.original.id} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

