import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TApproveForm, TFormProject, TProject, TRejectForm } from "@/types/project"

class ProjectService extends BaseService<TProject, TFormProject> {
  protected endpoint = 'projects'

  async REJECT(data:TRejectForm) {
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/reject`,
      data: data
    })
    return response.data
  }
  async APPROVE(data:TApproveForm) {
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/approve`,
      data: data
    })
    return response.data
  }
}

const projectService = new ProjectService()
export default projectService
