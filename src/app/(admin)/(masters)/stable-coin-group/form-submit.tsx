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
import { useCreateStableCoinGroup, useUpdateStableCoinGroup } from "@/modules/stable-coin-group/hooks/useStableCoinGroup"
import { formSTCGroupSchema } from "@/modules/stable-coin-group/schema"
import { TFormSTCGroup, TSTCGroup } from "@/types/stable-coin-group"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?:TSTCGroup }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateStableCoinGroup()
  const { mutate: update, isPending: creating } = useUpdateStableCoinGroup()
  const form = useForm<TFormSTCGroup>({
    resolver: zodResolver(formSTCGroupSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(values: TFormSTCGroup) {
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
            <DialogTitle>Form Stable Coin Group</DialogTitle>
            <DialogDescription>
              Make changes to your stable coin group here. Click save when you&apos;re
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
