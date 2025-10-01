'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteStableCoinGroup } from "@/modules/stable-coin-group/hooks/useStableCoinGroup"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteStableCoinGroup()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}