import { useMutation } from "@tanstack/react-query"
import uploadService from "@/services/upload.service"

export function useUpload() {
  return useMutation({
    mutationFn: (file: File) => uploadService.upload(file),
  })
}
