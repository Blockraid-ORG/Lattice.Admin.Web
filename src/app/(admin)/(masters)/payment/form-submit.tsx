"use client"
import { FormInput } from "@/components/forms/form-input"
import { FormSelect } from "@/components/forms/form-select"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import {
  useCreateAddressPoolPayment,
  useUpdateAddressPoolPayment
} from "@/modules/address-pool-payments/hooks/useAddressPoolPayment"
import { formMasterPaymentSchema } from "@/modules/address-pool-payments/schema"
import { useStableCoinList } from "@/modules/stable-coin/hooks/useStableCoin"
import { TFormMasterPayment, TMasterPayment } from "@/types/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?: TMasterPayment }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateAddressPoolPayment()
  const { mutate: update, isPending: creating } = useUpdateAddressPoolPayment()
  const { data: stables } = useStableCoinList()
  const form = useForm<TFormMasterPayment>({
    resolver: zodResolver(formMasterPaymentSchema),
    defaultValues: {
      listingFee: "",
      paymentSc: "",
      presaleFee: 0,
      stableCoinId: "",
    },
  })
  console.log({ stables })
  function onSubmit(values: TFormMasterPayment) {
    if (data?.id) {
      update({ id: data.id, data: values }, {
        onSuccess: () => {
          setDialog(false)
        }
      })
    } else {
      create(values, {
        onSuccess: () => {
          setDialog(false)
        }
      })

    }
  }
  function handleOpen() {
    setDialog(!dialog)
    form.reset({
      listingFee: data?.listingFee ? data.listingFee : "0",
      presaleFee: data?.presaleFee,
      paymentSc: data?.paymentSc,
      stableCoinId: data?.stableCoin.id
    })
  }
  return (
    <Dialog open={dialog} onOpenChange={handleOpen}>
      <form>
        <DialogTrigger asChild>
          {
            data?.id ? (
              <Button size={"icon-sm"}><Icon name="mdi:pencil" /></Button>
            ) : (
              <Button>Add New</Button>
            )
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Form Address Payment</DialogTitle>
            <DialogDescription>
              Make changes to your payment here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  <FormInput
                    placeholder="address"
                    label="Payment Address" name={"paymentSc"}
                    control={form.control}
                  />
                  {
                    stables?.length && (
                      <FormSelect
                        control={form.control}
                        name="stableCoinId"
                        label="Select address"
                        placeholder="select address"
                        groupLabel="Stable Address"
                        options={stables.map((i) => {
                          return {
                            ...i,
                          };
                        })}
                      />

                    )
                  }
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      placeholder="listingFee"
                      label="Listing Fee" name={"listingFee"}
                      control={form.control}
                    />
                    <FormInput
                      placeholder="presaleFee"
                      label="Presale Fee (%)" name={"presaleFee"}
                      control={form.control}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled={updating || creating} type="submit">Save</Button>
                  </DialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
