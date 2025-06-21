"use client"
import { toast } from "sonner";
import { toObjectQuery } from "@/lib/param";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import socialService from "../socials.service";
import { TFormSocial } from "@/types/social";


export const useSocial = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_social", query],
    queryFn: () => socialService.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormSocial) => socialService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_social"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => socialService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_social"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateSocial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormSocial }
    ) => socialService.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_social"]
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
export const useSocialList = () => {
  const queryChain = useQuery({
    queryKey: ["get_social_list"],
    queryFn: () => socialService.LISTS(),
    enabled: true
  });
  return queryChain
}