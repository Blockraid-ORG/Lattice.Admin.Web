import PageContainer from '@/components/page-container';
import SetPermissionContent from './content';
interface PageProps {
  searchParams: { roleId: string };
}
export default function page(props:PageProps) {
  return (
    <PageContainer>
      <SetPermissionContent roleId={props.searchParams.roleId} />
    </PageContainer>
  )
}
