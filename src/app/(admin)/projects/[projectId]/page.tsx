import PageContainer from '@/components/page-container'
import React from 'react'
import ProjectContent from './content'

export default function ProjectDetail() {
  return (
    <PageContainer title='Project' subtitle='Review User Project' canBack>
      <ProjectContent />
    </PageContainer>
  )
}
