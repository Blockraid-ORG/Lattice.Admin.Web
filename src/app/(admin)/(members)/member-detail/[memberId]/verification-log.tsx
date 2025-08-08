import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import dayjs from 'dayjs';
import { TMemberVerificationLog } from "@/types/member";
export default function VerificationLog({ data }: { data: TMemberVerificationLog[] }) {
  return (
    <div className="mt-6">
      <h2 className="mb-2 text-lg font-semibold">Verification Log</h2>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>DESCRIPTION</TableHead>
              <TableHead>STATUS</TableHead>
              <TableHead className="text-right">TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map(item => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.note ?? '-'}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell className="text-right text-xs font-semibold uppercase">{dayjs(item.createdAt).format('DD MMM YYYY HH:mm:ss')}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>

  )
}
