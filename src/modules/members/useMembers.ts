"use client"
import { toObjectQuery } from "@/lib/param";
import { TFormApproveMember, TFormChangeCategoryMember, TFormChangeTypeMember, TFormRejectMember } from "@/types/member";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import memberService from "./member.service";
import { toast } from "sonner";



export const usePublicMembers = () => {
  const searchString = useSearchParams();
  const queryFromParams = toObjectQuery(searchString)
  const query = {
    ...queryFromParams,
    type: "PUBLIC",
  };
  return useQuery({
    queryKey: ["get_members", query],
    queryFn: () => memberService.GET(query),
    enabled: true
  });
}
export const useProjectOwnerMembers = () => {
  const searchString = useSearchParams();
  const queryFromParams = toObjectQuery(searchString)
  const query = {
    ...queryFromParams,
    type: "PROJECT_OWNER",
  };
  return useQuery({
    queryKey: ["get_members", query],
    queryFn: () => memberService.GET(query),
    enabled: true
  });
}
export const useDetailMember = (id:string) => {
  return useQuery({
    queryKey: ["get_detail_member", id],
    queryFn: () => memberService.DETAIL(id),
    enabled: true
  });
}
export const useChangeCategoryMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormChangeCategoryMember) => memberService.CHANGE_CATEGORY(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success change category!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_detail_member", id]
      });
    },

    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}
export const useChangeTypeMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormChangeTypeMember) => memberService.CHANGE_TYPE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success change type!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_detail_member", id]
      });
    },

    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}

export const useRejectMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormRejectMember) => memberService.REJECT(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Member rejected!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_detail_member", id]
      });
    },

    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}

export const useApproveMember = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormApproveMember) => memberService.APPROVE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Member approved!"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_detail_member", id]
      });
    },

    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
}