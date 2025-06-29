'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteCategory } from "@/modules/category/hooks/useCategory"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteCategory()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}