"use client"
import { toast } from "sonner";
import { toObjectQuery } from "@/lib/param";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import service from "../stable-coin-group.service";
import { TFormSTCGroup } from "@/types/stable-coin-group";


export const useStableCoinGroup = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_stc_group", query],
    queryFn: () => service.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateStableCoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormSTCGroup) => service.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stc_group"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteStableCoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stc_group"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateStableCoinGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormSTCGroup }
    ) => service.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_stc_group"]
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
export const useStableCoinGroupList = () => {
  return useQuery({
    queryKey: ["get_stc_group_list"],
    queryFn: () => service.LISTS(),
    enabled: true
  });
}