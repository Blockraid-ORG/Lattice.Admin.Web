'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteStableCoin } from "@/modules/stable-coin/hooks/useStableCoin"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteStableCoin()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}