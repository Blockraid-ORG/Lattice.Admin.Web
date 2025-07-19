'use client'
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
import { approveMemberFormSchema } from "@/modules/members/schema"
import { useApproveMember } from "@/modules/members/useMembers"
import { TFormApproveMember } from "@/types/member"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormApprove({ userId }: { userId: string }) {
  const [dialog, setDialog] = useState(false)
  const { mutate } = useApproveMember(userId)
  const form = useForm<TFormApproveMember>({
    resolver: zodResolver(approveMemberFormSchema),
    defaultValues: {
      userId: userId,
      
    },
  })

  function onSubmit(values: TFormApproveMember) {
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
          <Button variant={'default'}>Approve</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Approve Member</DialogTitle>
            <DialogDescription>
              Are you sure, you want to approve this project?
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Yes, Approve</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
