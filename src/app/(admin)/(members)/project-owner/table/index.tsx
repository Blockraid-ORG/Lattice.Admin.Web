'use client'
import DataTable from '@/components/datatable'
import { useProjectOwnerMembers } from '@/modules/members/useMembers'
import { TMember } from '@/types/member'
import { useRouter, useSearchParams } from 'next/navigation'
import { columns } from './columns'

export default function Table() {
  const { data, isLoading } = useProjectOwnerMembers()

  const router = useRouter()
  const searchParams = useSearchParams()
  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <DataTable<TMember>
      data={data?.data || []}
      columns={columns}
      pageCount={data?.meta?.lastPage}
      pageIndex={data?.meta.currentPage ? data?.meta.currentPage - 1 : 0}
      pageSize={data?.meta.lastPage}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  )
}
