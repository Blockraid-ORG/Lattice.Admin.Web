import PageContainer from '@/components/page-container'
import React from 'react'
import Table from './table'

export default function PublicUserPage() {
  return (
    <PageContainer title='Public Member' subtitle='List Of Public Member'>
      <Table />
    </PageContainer>
  )
}
