import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TMember } from "@/types/member";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
export const columns: ColumnDef<TMember>[] = [
  {
    accessorKey: 'fullname',
    header: 'Name',
  },
  {
    accessorKey: 'walletAddress',
    header: 'Wallet Address',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'verification',
    header: 'Verification',
    cell: ({ row }) => {
      return (
        <div className="text-[11px] font-semibold">
          {row.original.verifications?.length ? row.original.verifications?.map((item, index) => (
            <div
              key={index}
              className={cn(
                'max-w-min px-2 rounded',
                item.status === 'PENDING' && 'bg-warning',
                item.status === 'REJECTED' && 'bg-danger',
                item.status === 'APPROVED' && 'bg-success',
              )}
            >{item.status}</div>
          )) : 'NO VERIFY'}
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
          {
            row.original.verifications?.length ? (
              <>
                <Button asChild size={"sm"} variant={'default'}>
                  <Link href={`/member-detail/${row.original.id}`}>
                    <Icon className="text-sm" name="clarity:help-info-line" />
                    Detail
                  </Link>
                </Button>
              </>
            ) : undefined
          }
        </div>
      )
    }
  }
]

