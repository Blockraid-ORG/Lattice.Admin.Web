import { Icon } from "@/components/icon";
import PermissionContainer from "@/components/permission-container";
import { TCategory } from "@/types/category";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: 'icon',
    header: 'Icon',
    cell: ({ row }) => {
      return <Icon name={row.original.icon} />
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'frequency',
    header: 'Frequency',
  },
  {
    accessorKey: 'targetYield',
    header: 'Target Yield',
  },
  {
    accessorKey: 'description',
    header: 'Description',
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

