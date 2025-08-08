"use client"
import { FormImageDropzone } from "@/components/forms/form-image-dropzone"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { useUpload } from "@/hooks/useUpload"
import { toUrlAsset } from "@/lib/utils"
import { useCreateChain, useUpdateChain } from "@/modules/chain/hooks/useChain"
import { formChainSchema } from "@/modules/chain/schema"
import { TChain, TFormChain } from "@/types/chain"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export function FormSubmit({ data }: { data?: TChain }) {
  const [dialog, setDialog] = useState(false)
  const { mutate: upload } = useUpload()
  const { mutate: createChain, isPending: updating } = useCreateChain()
  const { mutate: updateChain, isPending: creating } = useUpdateChain()
  const form = useForm<TFormChain>({
    resolver: zodResolver(formChainSchema),
    defaultValues: {
      name: "",
      logo: "",
      ticker: "",
      urlScanner: "",
      type: "",
      chainid: 1,
      urlApi: '',
      urlRpc: ''
    },
  })

  function onSubmit(values: TFormChain) {
    if (data?.id) {
      updateChain({ id: data.id, data: values }, {
        onSuccess: () => {
          setDialog(false)
        }
      })
    } else {
      createChain(values, {
        onSuccess: () => {
          setDialog(false)
        }
      })

    }
  }
  function handleUploadFile(file: File | null) {
    if (file) {
      upload(file, {
        onSuccess: (res) => {
          form.setValue('logo', res.path)
        }
      })
    }
  }
  function handleOpen() {
    setDialog(!dialog)
    form.reset({
      chainid: data?.chainid,
      logo: data?.logo,
      name: data?.name,
      ticker: data?.ticker,
      type: data?.type,
      urlApi: data?.urlApi || '-',
      urlRpc: data?.urlRpc || '-',
      urlScanner: data?.urlScanner,
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
            <DialogTitle>Form Chain</DialogTitle>
            <DialogDescription>
              Make changes to your chain here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <ScrollArea className="h-[60vh] md:h-auto">
                  <div className="grid md:grid-cols-4 gap-3 items-center mx-2">
                    <div className="w-32 md:w-auto">
                      <FormImageDropzone defaultImage={data?.logo ? toUrlAsset(form.getValues('logo')!) : ''} onChange={handleUploadFile} text="Upload Icon Here..." />
                    </div>
                    <div className="md:col-span-3 space-y-2">
                      <FormInput
                        placeholder="name"
                        label="Name" name={"name"}
                        control={form.control}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <FormInput
                          placeholder="ticker"
                          label="Ticker" name={"ticker"}
                          control={form.control}
                        />
                        <div>
                          <FormInput
                            placeholder="chainid"
                            label="Chainid" name={"chainid"}
                            control={form.control}
                          />
                          <a className="text-xs font-bold underline" href="https://docs.etherscan.io/etherscan-v2/supported-chains" target="_blank" rel="noopener noreferrer">Show Chain ID</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <FormSelect
                      placeholder="type"
                      label="Type" name={"type"}
                      control={form.control}
                      options={[
                        {
                          value: 'Mainnet',
                          label: 'Mainnet'
                        },
                        {
                          value: 'Testnet',
                          label: 'Testnet'
                        },
                      ]}
                    />
                    <FormInput
                      placeholder="urlScanner"
                      label="Scanner" name={"urlScanner"}
                      control={form.control}
                    />
                    <FormInput
                      placeholder="urlApi"
                      label="Url Api" name={"urlApi"}
                      control={form.control}
                    />
                    <FormInput
                      placeholder="urlRpc"
                      label="Url RPC" name={"urlRpc"}
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
