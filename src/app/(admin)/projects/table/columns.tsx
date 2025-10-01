import { Button } from "@/components/ui/button";
import { toUrlAsset } from "@/lib/utils";
import { TProject } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export const columns: ColumnDef<TProject>[] = [
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      return (
        <Image className="rounded" src={toUrlAsset(row.original.logo)} width={30} height={30} alt={row.original.logo} />
      )
    }
  },
  {
    accessorKey: 'chain',
    header: 'Chain',
    cell: ({ row }) => {
      return (
        <div>
          <div>{row.original.chains.map(i => i.chain.name)}</div>
          <div className="text-xs font-semibold">{row.original.chains.map(i => i.chain.type)}</div>
        </div>
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
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'addressPoolPaymentLog',
    header: 'Payment Status',
    cell: ({ row }) => {
      return (
        <>
          {row.original.addressPoolPaymentLog.length > 0 ? (
            <div>
              <div>Paid</div>
              <div className="text-xs font-semibold">
                {dayjs(row.original.addressPoolPaymentLog[0].createdAt).format('YYYY-MM-DD HH:mm')}
              </div>
            </div>
          ) : (
            <div>
              <div>Unpaid</div >
              <div className="text-xs font-semibold">Waiting Payment</div>
            </div >
          )}
        </>
      )
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-end gap-1">
          <Button asChild size={"sm"} variant={'default'}>
            <Link href={`/projects/${row.original.id}`}><Eye /> Review</Link>
          </Button>
        </div>
      )
    }
  }
]

