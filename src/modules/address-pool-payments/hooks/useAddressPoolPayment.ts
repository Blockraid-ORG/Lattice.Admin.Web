"use client"
import { toast } from "sonner";
import { toObjectQuery } from "@/lib/param";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import service from "@/modules/address-pool-payments/payment.service";
import { TFormMasterPayment } from "@/types/payment";


export const useAddressPoolPayment = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_address_pool_payments", query],
    queryFn: () => service.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateAddressPoolPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormMasterPayment) => service.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_address_pool_payments"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteAddressPoolPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_address_pool_payments"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateAddressPoolPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormMasterPayment }
    ) => service.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_address_pool_payments"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};

// extra
export const useAddressPoolPaymentList = () => {
  return useQuery({
    queryKey: ["get_address_pool_payments_list"],
    queryFn: () => service.LISTS(),
    enabled: true
  });
}