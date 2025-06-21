import SuspenceLoader from '@/components/suspence-loader';
import { Suspense } from 'react';
import FormTemplate from './form';
import Table from './table';
import PageContainer from '@/components/page-container';
export default function TemplateTablePage() {
  return (
    <PageContainer title='Wallets' subtitle='List Of Wallet' actions={
      <div className='flex gap-2 items-center'>
        <FormTemplate />
      </div>
    }>
      <Suspense fallback={<SuspenceLoader />}>
        <Table />
      </Suspense>
    </PageContainer>
  )
}
