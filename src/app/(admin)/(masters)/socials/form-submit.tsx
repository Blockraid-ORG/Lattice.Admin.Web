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
import { useCreateSocial, useUpdateSocial } from "@/modules/socials/hooks/useSocial"
import { formSocialSchema } from "@/modules/socials/schema"
import { TFormSocial, TSocial } from "@/types/social"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?:TSocial }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateSocial()
  const { mutate: update, isPending: creating } = useUpdateSocial()
  const form = useForm<TFormSocial>({
    resolver: zodResolver(formSocialSchema),
    defaultValues: {
      name: "",
      icon: "",
    },
  })

  function onSubmit(values: TFormSocial) {
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
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Form Social</DialogTitle>
            <DialogDescription>
              Make changes to your social here. Click save when you&apos;re
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
                  <div>
                    <FormInput
                      placeholder="icon"
                      label="Icon" name={"icon"}
                      control={form.control}
                    />
                    <Link className="text-xs underline text-primary font-semibold" href="https://icon-sets.iconify.design/" target="_blank" rel="noopener noreferrer">Source</Link>
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
