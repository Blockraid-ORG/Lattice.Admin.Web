import PermissionContainer from "@/components/permission-container";
import { TSTCGroup } from "@/types/stable-coin-group";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
export const columns: ColumnDef<TSTCGroup>[] = [
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
          <PermissionContainer permission='PATCH_categories/:id'>
            <FormSubmit
              data={{ ...row.original }}
            />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_categories/:id'>
            <ConfirmDelete id={row.original.id} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

