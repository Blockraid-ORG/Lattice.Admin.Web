'use client'
import { FormSelect } from "@/components/forms/form-select"
import { Icon } from "@/components/icon"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Form } from "@/components/ui/form"
import { typeMemberFormSchema } from "@/modules/members/schema"
import { useChangeTypeMember } from "@/modules/members/useMembers"
import { TFormChangeTypeMember } from "@/types/member"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormChangeType(data: TFormChangeTypeMember) {
  const [dialog, setDialog] = useState(false)
  const { mutate } = useChangeTypeMember(data.userId)
  const form = useForm<TFormChangeTypeMember>({
    resolver: zodResolver(typeMemberFormSchema),
    defaultValues: {
      userId: data.userId,
      type: data.type,
    },
  })

  function onSubmit(values: TFormChangeTypeMember) {
    mutate(values, {
      onSuccess: () => {
        setDialog(false)
      }
    })
  }
  return (
    <Dialog open={dialog} onOpenChange={() => setDialog(!dialog)}>
      <Form {...form}>
        <DialogTrigger asChild>
          <Button variant={'default'}>
            <Icon name="mingcute:pencil-fill" />
            Type
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Member Type</DialogTitle>
          </DialogHeader>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormSelect
                  name="type"
                  control={form.control}
                  label="Member Type"
                  options={[
                    {
                      label: 'PROJECT_OWNER',
                      value: 'PROJECT_OWNER',
                    },
                    {
                      label: 'PUBLIC',
                      value: 'PUBLIC',
                    },
                    {
                      label: 'INTERNAL',
                      value: 'INTERNAL',
                    },
                  ]}
                />
              </div>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
