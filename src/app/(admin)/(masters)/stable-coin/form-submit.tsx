"use client"
import { FormInput } from "@/components/forms/form-input"
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
import { toUrlAsset } from "@/lib/utils"
import { useChainList } from "@/modules/chain/hooks/useChain"
import { useStableCoinGroupList } from "@/modules/stable-coin-group/hooks/useStableCoinGroup"
import { useCreateStableCoin, useUpdateStableCoin } from "@/modules/stable-coin/hooks/useStableCoin"
import { formStableCoinSchema } from "@/modules/stable-coin/schema"
import { TFormStableCoin, TStableCoin } from "@/types/stable-coin"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?: TStableCoin }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: create, isPending: updating } = useCreateStableCoin()
  const { mutate: update, isPending: creating } = useUpdateStableCoin()
  const { data: chains } = useChainList();
  const { data: stables } = useStableCoinGroupList();
  const form = useForm<TFormStableCoin>({
    resolver: zodResolver(formStableCoinSchema),
    defaultValues: {
      chainId: "",
      stableCoinGroupId: "",
      address: "",
      decimal: 6,
    },
  })

  function onSubmit(values: TFormStableCoin) {
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
    console.log({data})
    form.reset({
      ...data,
      chainId: data?.chain.id,
      stableCoinGroupId: data?.stableCoin.id,
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
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Form Stable Coin</DialogTitle>
            <DialogDescription>
              Make changes to your stable coin here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <div className="grid grid-cols-1 gap-3">
                  {
                    chains && chains.length > 0 && (
                      <FormSelect
                        control={form.control}
                        name="chainId"
                        label="Select Chain"
                        placeholder="select chain"
                        groupLabel="Chain"
                        options={chains.map((i) => {
                          return {
                            ...i,
                            iconUrl: i.logo && toUrlAsset(i.logo),
                          };
                        })}
                      />
                    )
                  }
                  {
                    stables && stables.length > 0 && (
                      <FormSelect
                        control={form.control}
                        name="stableCoinGroupId"
                        label="Select Group"
                        placeholder="select group"
                        groupLabel="Group"
                        options={stables.map((i) => {
                          return i;
                        })}
                      />
                    )
                  }
                  <FormInput
                    placeholder="address"
                    label="Address" name={"address"}
                    control={form.control}
                  />
                  <FormInput
                    placeholder="decimal"
                    label="Decimal" name={"decimal"}
                    control={form.control}
                    type="number"
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
