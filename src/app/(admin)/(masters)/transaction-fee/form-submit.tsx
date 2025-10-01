"use client"
import { FormInput } from "@/components/forms/form-input"
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
import { useCreateAddressPoolPayment, useUpdateAddressPoolPayment } from "@/modules/address-pool-payments/hooks/useAddressPoolPayment"
import { formMasterPaymentSchema } from "@/modules/address-pool-payments/schema"
import { TFormMasterPayment, TMasterPayment } from "@/types/payment"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?:TMasterPayment }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateAddressPoolPayment()
  const { mutate: update, isPending: creating } = useUpdateAddressPoolPayment()
  const form = useForm<TFormMasterPayment>({
    resolver: zodResolver(formMasterPaymentSchema),
    defaultValues: {
      name: "",
      address: '',
      decimal: 6,
      ticker: '',
      amountFee: ''
    },
  })

  function onSubmit(values: TFormMasterPayment) {
    if (data?.id) {
      update({id:data.id, data:values}, {
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
    form.reset({ ...data })
  }
  return (
    <Dialog open={dialog} onOpenChange={handleOpen}>
      <form>
        <DialogTrigger asChild>
          {
            data?.id? (
              <Button size={"icon-sm"}><Icon name="mdi:pencil" /></Button>
            ) : (
              <Button>Add New</Button>
            )
          }
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
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
                    placeholder="name"
                    label="Name" name={"name"}
                    control={form.control}
                  />
                  <FormInput
                    placeholder="ticker"
                    label="Ticker" name={"ticker"}
                    control={form.control}
                  />
                  <FormInput
                    placeholder="amountFee"
                    label="Amount Fee" name={"amountFee"}
                    control={form.control}
                  />
                  <FormInput
                    placeholder="address"
                    label="Address" name={"address"}
                    control={form.control}
                  />
                  <FormInput
                    placeholder="decimal"
                    label="Decimal" name={"decimal"}
                    control={form.control}
                  />
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
