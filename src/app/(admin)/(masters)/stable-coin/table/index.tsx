'use client'
import DataTable from '@/components/datatable'
import PermissionContainer from '@/components/permission-container'
import { useStableCoin } from '@/modules/stable-coin/hooks/useStableCoin'
import { TStableCoin } from '@/types/stable-coin'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormSubmit } from '../form-submit'
import { columns } from './columns'

export default function Table() {
  const { data, isLoading } = useStableCoin()

  const router = useRouter()
  const searchParams = useSearchParams()
  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <DataTable<TStableCoin>
      actions={
        <PermissionContainer permission='POST_categories'>
          <FormSubmit />
        </PermissionContainer>
      }
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
