import PermissionContainer from "@/components/permission-container";
import { TMasterPayment } from "@/types/payment";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
import { StatusPayment } from "../status-payment";
export const columns: ColumnDef<TMasterPayment>[] = [
  {
    accessorKey: 'stableCoin.chain.name',
    header: 'Chain',
  },
  {
    accessorKey: 'paymentSc',
    header: 'Payment Address',
  },
  {
    accessorKey: 'stableCoin.address',
    header: 'Stable Address',
  },
  {
    accessorKey: 'presaleFee',
    header: 'Presale Fee',
    cell: ({ row }) => {
      return (
        <div>{row.original.presaleFee}%</div>
      )
    }
  },
  {
    accessorKey: 'listingFee',
    header: 'Listing Fee',
    cell: ({ row }) => {
      return (
        <div>{row.original.listingFee} { row.original.stableCoin.stableCoin.name}</div>
      )
    }
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <StatusPayment data={row.original} />
      )
    }
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

