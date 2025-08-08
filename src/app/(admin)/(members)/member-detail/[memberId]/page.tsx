import PageContainer from '@/components/page-container'
import React from 'react'
import DetailContent from './content'

export default function MemberDetail() {
  return (
    <PageContainer canBack title='Detail' subtitle={`Detail Of Member`}>
      <DetailContent />
    </PageContainer>
  )
}
