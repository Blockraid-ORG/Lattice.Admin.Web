import PermissionContainer from "@/components/permission-container";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toUrlAsset } from "@/lib/utils";
import { TChain } from "@/types/chain";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ConfirmDelete } from "../confirm-delete";
import { FormSubmit } from "../form-submit";
export const columns: ColumnDef<TChain>[] = [
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      return (
        <Popover>
          <PopoverTrigger>
            <div className="w-10 h-10 border rounded-md overflow-hidden p-1">
              <Image className="h-full w-full object-contain" src={toUrlAsset(row.original.logo)} width={100} height={100} alt="logo" />
            </div>
          </PopoverTrigger>
          <PopoverContent side="left" align="center">
            <div className="w-full h-full border rounded-md overflow-hidden">
              <Image className="h-full w-full object-contain" src={toUrlAsset(row.original.logo)} width={300} height={300} alt="logo" />
            </div>
          </PopoverContent>
        </Popover>
      )
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'ticker',
    header: 'Ticker',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'chainid',
    header: 'Chainid',
  },
  {
    accessorKey: 'url',
    header: 'Urls',
    cell: ({ row }) => {
      return (
        <div>
          <div className="flex">
            <div className="w-24 shrink-0">Api Url</div>
            <div className="w-2">:</div>
            <div className="flex-1">
              {row.original.urlApi ?? "-"}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 shrink-0">Rpc Url</div>
            <div className="w-2">:</div>
            <div className="flex-1">
              {row.original.urlRpc ?? "-"}
            </div>
          </div>
          <div className="flex">
            <div className="w-24 shrink-0">Scanner</div>
            <div className="w-2">:</div>
            <div className="flex-1">
              {row.original.urlScanner ?? "-"}
            </div>
          </div>
        </div>
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
            <FormSubmit
              data={{ ...row.original }}
            />
          </PermissionContainer>
          <PermissionContainer permission='DELETE_chains/:id'>
            <ConfirmDelete id={row.original.id} />
          </PermissionContainer>
        </div>
      )
    }
  }
]

