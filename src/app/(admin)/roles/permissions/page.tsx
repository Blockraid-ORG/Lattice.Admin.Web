import PageContainer from '@/components/page-container'
import Table from './table'

export default function page() {
  return (
    <PageContainer title='Permission' subtitle='List Of Permission'>
      <Table />
    </PageContainer>
  )
}