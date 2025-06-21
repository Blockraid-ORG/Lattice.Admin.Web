"use client"
import { toObjectQuery } from "@/lib/param";
import { TFormRole } from "@/types/role";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import roleService from "../role.service";


export const useRole = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryRole = useQuery({
    queryKey: ["get_Role", query],
    queryFn: () => roleService.GET(query),
    enabled: true
  });
  return queryRole
}

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormRole) => roleService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_Role"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => roleService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_Role"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
    { id, data }: { id: string; data: TFormRole }
    ) => roleService.UPDATE(id,data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_Role"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDetailRole = (id: string) => {
  return useQuery({
    queryKey: ["detail_role", id],
    queryFn: () => roleService.DETAIL(id),
  });
}

// extra
export const useRoleList = () => {
  const queryRole = useQuery({
    queryKey: ["get_role_list"],
    queryFn: () => roleService.LISTS(),
    enabled: true
  });
  return queryRole
}