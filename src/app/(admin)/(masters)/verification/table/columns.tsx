import PermissionContainer from "@/components/permission-container";
import { TVerification } from "@/types/verifications";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
export const columns: ColumnDef<TVerification>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'IDCardRequired',
    header: 'ID Card',
    cell: ({ row }) => {
      return <div>{ row.original.IDCardRequired ? "REQUIRED":"OPTIONAL"}</div>
    }
  },
  {
    accessorKey: 'SelfieRequired',
    header: 'Selfie',
    cell: ({ row }) => {
      return <div>{row.original.SelfieRequired ? "REQUIRED" : "OPTIONAL"}</div>
    }
  },
  {
    accessorKey: 'BussinessLicenseRequired',
    header: 'Bussiness License',
    cell: ({ row }) => {
      return <div>{row.original.BussinessLicenseRequired ? "REQUIRED" : "OPTIONAL"}</div>
    }
  },
  {
    accessorKey: 'TaxIdRequired',
    header: 'Tax ID',
    cell: ({ row }) => {
      return <div>{row.original.TaxIdRequired ? "REQUIRED" : "OPTIONAL"}</div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <PermissionContainer permission='PATCH_master-verifications/:id'>
            <FormSubmit
              data={{ ...row.original }}
            />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_master-verifications/:id'>
            <ConfirmDelete id={row.original.id} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

