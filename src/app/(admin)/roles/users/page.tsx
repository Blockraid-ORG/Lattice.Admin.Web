import PageContainer from '@/components/page-container'
import Table from './table'

export default function page() {
  return (
    <PageContainer title='User' subtitle='List Of User'>
      <Table />
    </PageContainer>
  )
}
