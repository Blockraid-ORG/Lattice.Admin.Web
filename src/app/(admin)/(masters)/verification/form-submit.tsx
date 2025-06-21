"use client"
import { FormInput } from "@/components/forms/form-input"
import { FormSelect } from "@/components/forms/form-select"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { useCreateVerification, useUpdateVerification } from "@/modules/verification/hooks/useChain"
import { formVerificationSchema } from "@/modules/verification/schema"
import { TFormVerification, TVerification } from "@/types/verifications"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?: TVerification }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateVerification()
  const { mutate: update, isPending: creating } = useUpdateVerification()
  const form = useForm<TFormVerification>({
    resolver: zodResolver(formVerificationSchema),
    defaultValues: {
      name: "",
      type: "",
      IDCardRequired: true,
      SelfieRequired: true,
      BussinessLicenseRequired: false,
      TaxIdRequired: false
    },
  })

  function onSubmit(values: TFormVerification) {
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
    form.reset({ ...data })
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
            <DialogTitle>Form Verification Type</DialogTitle>
            <DialogDescription>
              Make changes to your verification yype here. Click save when you&apos;re
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
                  <FormSelect
                    placeholder="type"
                    label="Type" name={"type"}
                    control={form.control}
                    options={[
                      {
                        value: 'PERSONAL',
                        label: 'PERSONAL'
                      },
                      {
                        value: 'CORPORATE',
                        label: 'CORPORATE'
                      },
                    ]}
                  />
                  <FormField
                    control={form.control}
                    name="IDCardRequired"
                    render={({ field }) => {
                      return (
                        <FormItem
                          className="flex items-end gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              defaultChecked={data?.IDCardRequired}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="mb-2 block">
                            ID Card Required
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="SelfieRequired"
                    render={({field}) => {
                      return (
                        <FormItem
                          className="flex items-end gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              defaultChecked={data?.SelfieRequired}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="mb-2 block">
                            Selfie Required
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="BussinessLicenseRequired"
                    render={({field}) => {
                      return (
                        <FormItem
                          className="flex items-end gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              defaultChecked={data?.BussinessLicenseRequired}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="mb-2 block">
                            Bussiness License Required
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="TaxIdRequired"
                    render={({field}) => {
                      return (
                        <FormItem
                          className="flex items-end gap-2"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              defaultChecked={data?.TaxIdRequired}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="mb-2 block">
                            TaxId Required
                          </FormLabel>
                        </FormItem>
                      )
                    }}
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
