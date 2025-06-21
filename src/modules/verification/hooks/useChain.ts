"use client"
import { toObjectQuery } from "@/lib/param";
import { TFormVerification } from "@/types/verifications";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import verificationnService from "../verification.service";


export const useVerification = () => {
  const searchString = useSearchParams();
  const query = toObjectQuery(searchString)
  const queryVerification = useQuery({
    queryKey: ["get_verification", query],
    queryFn: () => verificationnService.GET(query),
    enabled: true
  });
  return queryVerification
}

export const useCreateVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TFormVerification) => verificationnService.CREATE(data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_verification"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to submit data!"
      })
    }
  });
};
export const useDeleteVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => verificationnService.DELETE(id),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success delete data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_verification"]
      });
    },
    onError: () => {
      toast.error('Error', {
        description: "Fail to delete data!"
      })
    }
  });
};

export const useUpdateVerification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (
      { id, data }: { id: string; data: TFormVerification }
    ) => verificationnService.UPDATE(id, data),
    onSuccess: () => {
      toast.success('Success', {
        description: "Success submit data"
      })
      queryClient.invalidateQueries({
        queryKey: ["get_verification"]
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
export const useVerificationList = () => {
  const queryChain = useQuery({
    queryKey: ["get_verification_list"],
    queryFn: () => verificationnService.LISTS(),
    enabled: true
  });
  return queryChain
}