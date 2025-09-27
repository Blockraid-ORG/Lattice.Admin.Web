'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteProjectType } from "@/modules/project-type/hooks/useProjectType"
export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteProjectType()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}