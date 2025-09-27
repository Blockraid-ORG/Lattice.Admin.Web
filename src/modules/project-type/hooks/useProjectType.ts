"use client"
import { toObjectQuery } from "@/lib/param";
import { TProjectTypeForm } from "@/types/project-type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import projectTypeService from "../project-type.service";


export const useProjectType = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryChain = useQuery({
    queryKey: ["get_project_type", query],
    queryFn: () => projectTypeService.GET(query),
    enabled: true
  });
  return queryChain
}

export const useCreateProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TProjectTypeForm) => projectTypeService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project_type"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectTypeService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project_type"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateProjectType = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TProjectTypeForm }
    ) => projectTypeService.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project_type"]
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
export const useProjectTypeList = () => {
  const queryChain = useQuery({
    queryKey: ["get_project_type_list"],
    queryFn: () => projectTypeService.LISTS(),
    enabled: true
  });
  return queryChain
}