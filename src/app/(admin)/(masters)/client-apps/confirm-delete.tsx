'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteClientApps } from "@/modules/client-apps/hooks/useClientApps"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteClientApps()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}