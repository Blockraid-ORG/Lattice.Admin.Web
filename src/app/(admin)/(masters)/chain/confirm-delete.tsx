'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteChain } from "@/modules/chain/hooks/useChain"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteChain()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}