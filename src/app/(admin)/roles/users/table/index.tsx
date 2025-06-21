'use client'
import DataTable from '@/components/datatable'
import PermissionContainer from '@/components/permission-container'
import { useUser } from '@/hooks/user/useUser'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormAction } from '../form'
import { columns } from './columns'

export default function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = 10
  const { lists } = useUser()

  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <DataTable
      actions={
        <PermissionContainer permission='POST_users'>
          <FormAction />
        </PermissionContainer>
      }
      data={lists.data?.data?.data ?? []}
      columns={columns}
      pageCount={lists.data?.data?.meta?.lastPage}
      pageIndex={lists.data?.data?.meta?.currentPage - 1}
      pageSize={pageSize}
      onPageChange={onPageChange}
      isLoading={lists.isLoading}
    />
  )
}
