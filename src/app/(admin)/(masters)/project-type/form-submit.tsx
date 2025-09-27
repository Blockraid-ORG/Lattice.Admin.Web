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
import { useCreateProjectType, useUpdateProjectType } from "@/modules/project-type/hooks/useProjectType"
import { formProjectTypeSchema } from "@/modules/project-type/schema"
import { TProjectType, TProjectTypeForm } from "@/types/project-type"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?:TProjectType }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateProjectType()
  const { mutate: update, isPending: creating } = useUpdateProjectType()
  const form = useForm<TProjectTypeForm>({
    resolver: zodResolver(formProjectTypeSchema),
    defaultValues: {
      name: "",
      description:'',
      icon: "",
    },
  })

  function onSubmit(values: TProjectTypeForm) {
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
                  <FormInput
                    placeholder="description"
                    label="Description" name={"description"}
                    control={form.control}
                    isLongText
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
