'use client'
import DataTable from '@/components/datatable'
import { useRouter, useSearchParams } from 'next/navigation'
import { columns } from './columns'
import PermissionContainer from '@/components/permission-container'
import { useRole } from '@/modules/roles/hooks/useRole'
import { FormSubmit } from '../form-submit'

export default function Table() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageSize = 10
  const { data, isLoading } = useRole()



  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <DataTable
      actions={
        <PermissionContainer permission='POST_roles'>
          <FormSubmit />
        </PermissionContainer>
      }
      data={data?.data ?? []}
      columns={columns}
      pageCount={data?.meta?.lastPage}
      pageIndex={data?.meta?.currentPage && data?.meta?.currentPage - 1}
      pageSize={pageSize}
      onPageChange={onPageChange}
      isLoading={isLoading}
    />
  )
}
