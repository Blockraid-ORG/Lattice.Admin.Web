"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import service from "../client-apps.service";
import { toast } from "sonner";
import { toObjectQuery } from "@/lib/param";
import { TFormClientApps } from "@/types/client-apps";


export const useClientApps = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_client_app", query],
    queryFn: () => service.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateClientApps = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormClientApps) => service.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_client_app"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteClientApps = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => service.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_client_app"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateClientApps = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormClientApps }
    ) => service.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_client_app"]
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
export const useClientAppsList = () => {
  const query = useQuery({
    queryKey: ["get_client_app_list"],
    queryFn: () => service.LISTS(),
    enabled: true
  });
  return query
}