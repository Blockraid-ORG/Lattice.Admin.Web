'use client'
import DataTable from '@/components/datatable'
import PermissionContainer from '@/components/permission-container'
import { useChain } from '@/modules/chain/hooks/useChain'
import React from 'react'
import { columns } from './columns'
import { useRouter, useSearchParams } from 'next/navigation'
import { TChain } from '@/types/chain'
import { FormSubmit } from '../form-submit'

export default function Table() {
  const { data, isLoading } = useChain()

  const router = useRouter()
  const searchParams = useSearchParams()
  async function onPageChange(e: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', String(e + 1))
    router.push(`?${params.toString()}`)
  }
  return (
    <DataTable<TChain>
      actions={
        <PermissionContainer permission='POST_chains'>
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
