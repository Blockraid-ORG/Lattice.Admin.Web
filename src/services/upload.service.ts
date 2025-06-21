import axiosInstance from "@/lib/axios"

type TUploadResponse = {
  id: string
  originalname: string
  filename: string
  path: string
  mimetype: string
  size:null
  storage: string
}
class UploadService {
  async upload(file: File, fieldName = "file"): Promise<TUploadResponse> {
    const formData = new FormData()
    formData.append(fieldName, file)

    const response = await axiosInstance.post("/files/upload/local", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data.data
  }
}

const uploadService = new UploadService()
export default uploadService
