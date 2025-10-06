import { Switch } from "@/components/ui/switch"
import { useSetStatusAddressPoolPayment } from "@/modules/address-pool-payments/hooks/useAddressPoolPayment"
import { TMasterPayment } from "@/types/payment"
export function StatusPayment({ data }: { data: TMasterPayment }) {
  const { mutate } = useSetStatusAddressPoolPayment()
  async function onCheckedChange(state: boolean) {
    mutate({
      id: data?.id,
      status: state
    })
  }
  return <Switch onCheckedChange={onCheckedChange} checked={data.status} id={`payment-${data?.id}`} />
}