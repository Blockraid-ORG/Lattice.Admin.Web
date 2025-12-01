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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useCreateClientApps, useUpdateClientApps } from "@/modules/client-apps/hooks/useClientApps"
import { formClientAppSchema } from "@/modules/client-apps/schema"
import { TClientApps, TFormClientApps } from "@/types/client-apps"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?: TClientApps }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: createClientApps, isPending: updating } = useCreateClientApps()
  const { mutate: updateClientApps, isPending: creating } = useUpdateClientApps()
  const form = useForm<TFormClientApps>({
    resolver: zodResolver(formClientAppSchema),
    defaultValues: {
      name: "",
      code: "",
      url: "",
      description: ""
    },
  })

  function onSubmit(values: TFormClientApps) {
    if (data?.id) {
      updateClientApps({ id: data.id, data: values }, {
        onSuccess: () => {
          setDialog(false)
        }
      })
    } else {
      createClientApps(values, {
        onSuccess: () => {
          setDialog(false)
        }
      })

    }
  }
  function handleOpen() {
    setDialog(!dialog)
    form.reset({
      name: data?.name,
      code: data?.code,
      url: data?.url || '-',
      description: data?.description || '-',
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
            <DialogTitle>Form Apps</DialogTitle>
            <DialogDescription>
              Make changes to your chain here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <ScrollArea className="h-[60vh] md:h-auto">
                  <div className="space-y-4 p-2">
                    <FormInput
                      placeholder="name"
                      label="Name" name={"name"}
                      control={form.control}
                    />
                    <FormInput
                      placeholder="code"
                      label="Code" name={"code"}
                      control={form.control}
                    />
                    <FormInput
                      placeholder="url"
                      label="Url" name={"url"}
                      control={form.control}
                    />
                    <FormInput
                      isLongText
                      placeholder="description"
                      label="Description" name={"description"}
                      control={form.control}
                    />
                  </div>
                </ScrollArea>
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
