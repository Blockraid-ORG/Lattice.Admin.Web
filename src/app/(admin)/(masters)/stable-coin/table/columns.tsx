import PermissionContainer from "@/components/permission-container";
import { TStableCoin } from "@/types/stable-coin";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
export const columns: ColumnDef<TStableCoin>[] = [
  {
    accessorKey: 'chain.name',
    header: 'Chain',
  },
  {
    accessorKey: 'stableCoin.name',
    header: 'Name',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'decimal',
    header: 'Decimal',
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

