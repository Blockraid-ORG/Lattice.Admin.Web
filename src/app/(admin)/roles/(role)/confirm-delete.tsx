// 'use client';
// import { useAlertDialog } from '@/components/dialog/useAlertDialog';
// import { Button } from '@/components/ui/button';
// import { useDeleteRole } from '@/modules/roles/hooks/useRole';
// import { TRole } from '@/types/role';
// import { MdDeleteSweep } from "react-icons/md";

// export default function FormDelete({ data }: { data: TRole }) {
//   const { showAlert } = useAlertDialog();
//   const { mutate, isPending } = useDeleteRole()

//   const handleDelete = () => {
//     showAlert({
//       title: 'Are you absolutely sure?',
//       description:`You will delete data ${data.name}, This action cannot be undone!`,
//       confirmText: 'Delete',
//       cancelText: 'Cancel',
//       onConfirm: () => mutate(data.id)
//     });
//   };

//   return (
//     <Button onClick={handleDelete} size={"icon-sm"} variant={'danger'}>
//       <MdDeleteSweep />
//     </Button>
//   )
// }


'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteRole } from "@/modules/roles/hooks/useRole"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteRole()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}
