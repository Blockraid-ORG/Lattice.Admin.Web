import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import dayjs from 'dayjs';
import { TAllocation } from '@/types/project'
export default function Allocations({ data }: { data: TAllocation[] }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold">Allocation Info</h2>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>VESTING</TableHead>
              <TableHead className="text-right">START DATE</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.supply}</TableCell>
                  <TableCell>{item.vesting} Month</TableCell>
                  <TableCell className="text-right">{dayjs(item.startDate).format('MMM DD, YYYY')}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
    
  )
}
