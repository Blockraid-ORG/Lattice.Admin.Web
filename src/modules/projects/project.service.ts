import { BaseService } from "@/services/base.service"
import { TFormProject, TProject } from "@/types/project"

class ProjectService extends BaseService<TProject, TFormProject> {
  protected endpoint = 'projects'
}

const projectService = new ProjectService()
export default projectService
