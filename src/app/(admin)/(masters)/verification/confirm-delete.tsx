'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteVerification } from "@/modules/verification/hooks/useChain"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteVerification()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}