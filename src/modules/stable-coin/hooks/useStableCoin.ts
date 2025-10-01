"use client"
import { toObjectQuery } from "@/lib/param";
import { TFormStableCoin } from "@/types/stable-coin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import service from "../stable-coin.service";


export const useStableCoin = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_stable_coin", query],
    queryFn: () => service.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateStableCoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormStableCoin) => service.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stable_coin"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteStableCoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stable_coin"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateStableCoin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormStableCoin }
    ) => service.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stable_coin"]
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
export const useStableCoinList = () => {
  return useQuery({
    queryKey: ["get_stable_coin"],
    queryFn: () => service.LISTS(),
    enabled: true
  });
}