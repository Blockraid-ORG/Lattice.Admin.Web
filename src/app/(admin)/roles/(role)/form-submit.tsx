"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useCreateRole, useUpdateRole } from "@/modules/roles/hooks/useRole"
import { formRoleSchema } from "@/modules/roles/schema"
import { TFormRole, TRole } from "@/types/role"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { RiAddLine, RiPencilLine } from "react-icons/ri"

export function FormSubmit({ data }: { data?: TRole }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateRole()
  const { mutate: update, isPending: creating } = useUpdateRole()
  const form = useForm<TFormRole>({
    resolver: zodResolver(formRoleSchema),
    defaultValues: {
      name: '',
      code: '',
    }
  })

  function onSubmit(values: TFormRole) {
    if (data?.id) {
      update(
        { id: data.id, data: values },
        {
          onSuccess: () => {
            setDialog(false)
          }
        }
      )
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
      <DialogTrigger asChild>
        {
          data?.id ? (
            <Button size={"icon-sm"} variant={'warning'}>
              <RiPencilLine />
            </Button>
          ) : (
            <Button className="w-full flex justify-start items-center"> <RiAddLine /> Add New</Button>
          )
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Form Role</DialogTitle>
          <DialogDescription>
            Form Create Or Update Role
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button disabled={updating || creating} type="submit">Save</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
