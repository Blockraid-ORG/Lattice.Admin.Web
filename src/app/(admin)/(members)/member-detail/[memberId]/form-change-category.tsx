'use client'
import { FormSelect } from "@/components/forms/form-select"
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
import { categoryMemberFormSchema } from "@/modules/members/schema"
import { useChangeCategoryMember } from "@/modules/members/useMembers"
import { TFormChangeCategoryMember } from "@/types/member"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormChangeCategory(data: TFormChangeCategoryMember) {
  const [dialog, setDialog] = useState(false)
  const { mutate } = useChangeCategoryMember(data.userId)
  const form = useForm<TFormChangeCategoryMember>({
    resolver: zodResolver(categoryMemberFormSchema),
    defaultValues: {
      userId: data.userId,
      category: data.category,
    },
  })

  function onSubmit(values: TFormChangeCategoryMember) {
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
            Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Member Category</DialogTitle>
            <DialogDescription>
              Change The Member category to set how self verifiy!
            </DialogDescription>
          </DialogHeader>
          <div>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormSelect
                  name="category"
                  control={form.control}
                  label="Category"
                  options={[
                    {
                      label: 'PERSONAL',
                      value: 'PERSONAL',
                    },
                    {
                      label: 'CORPORATE',
                      value: 'CORPORATE',
                    },
                    {
                      label: 'UNSIGNED',
                      value: 'UNSIGNED',
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
