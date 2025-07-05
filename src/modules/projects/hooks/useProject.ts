"use client"
import { toObjectQuery } from "@/lib/param";
import { TApproveForm, TFormProject, TRejectForm } from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import projectService from "../project.service";


export const useProject = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  return useQuery({
    queryKey: ["get_project", query],
    queryFn: () => projectService.GET(query),
    enabled: true
  });
}

export const useProjectDetail = (id?: string) => {
  return useQuery({
    queryKey: ["get_project_by_id", id],
    queryFn: () => projectService.DETAIL(id!),
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormProject) => projectService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormProject }
    ) => projectService.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project"]
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

export const useProjectReject = (id:string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TRejectForm) => projectService.REJECT(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Project rejected!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project_by_id", id]
      });
    },
    
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}
export const useProjectApprove = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TApproveForm) => projectService.APPROVE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Project approved!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_project_by_id", id]
      });
    },

    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}

export const useProjectList = () => {
  return useQuery({
    queryKey: ["get_project_list"],
    queryFn: () => projectService.LISTS(),
    enabled: true
  });
}