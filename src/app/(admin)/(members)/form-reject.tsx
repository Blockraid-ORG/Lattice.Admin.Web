'use client'
import { FormInput } from "@/components/forms/form-input"
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
import { rejectMemberFormSchema } from "@/modules/members/schema"
import { useRejectMember } from "@/modules/members/useMembers"
import { TFormRejectMember } from "@/types/member"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormReject({ userId }: { userId: string }) {
  const [dialog, setDialog] = useState(false)
  const { mutate } = useRejectMember(userId)
  const form = useForm<TFormRejectMember>({
    resolver: zodResolver(rejectMemberFormSchema),
    defaultValues: {
      userId: userId,
      rejectionReason: "",
    },
  })

  function onSubmit(values: TFormRejectMember) {
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
          <Button variant={'destructive'}>Reject</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Form Reject</DialogTitle>
            <DialogDescription>
              Please give reasons why you reject this project?
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                control={form.control}
                name="rejectionReason"
                label="Reason"
                placeholder="type your reason..."
                isLongText
              />
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant={'destructive'} type="submit">Submit Reason</Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Form>
    </Dialog>
  )
}
