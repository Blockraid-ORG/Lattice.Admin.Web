import { Button } from "@/components/ui/button";
import { TProject } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { toast } from "sonner";
export const columns: ColumnDef<TProject>[] = [
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
    accessorKey: 'logo',
    header: 'Logo',
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
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center justify-end gap-1">
          <Button onClick={()=>toast.info('Under Develop')} size={"sm"} variant={'default'}>
            <Eye /> Review
          </Button>
        </div>
      )
    }
  }
]

