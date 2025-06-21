"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import chainService from "../chain.service";
import { TFormChain } from "@/types/chain";
import { toast } from "sonner";
import { toObjectQuery } from "@/lib/param";


export const useChain = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_chain", query],
    queryFn: () => chainService.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateChain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormChain) => chainService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_chain"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteChain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => chainService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_chain"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateChain = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormChain }
    ) => chainService.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_chain"]
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
export const useChainList = () => {
  const queryChain = useQuery({
    queryKey: ["get_chain_list"],
    queryFn: () => chainService.LISTS(),
    enabled: true
  });
  return queryChain
}