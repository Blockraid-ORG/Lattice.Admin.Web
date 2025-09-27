'use client'
import { FormDelete } from "@/components/forms/form-delete"
import { useDeleteAddressPoolPayment } from "@/modules/address-pool-payments/hooks/useAddressPoolPayment"

export function ConfirmDelete({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteAddressPoolPayment()
  return (
    <FormDelete
      onConfirm={() => mutate(id)}
      isLoading={isPending}
      title="Delete Data?"
      description="This will permanently delete this data from the system."
    />
  )
}