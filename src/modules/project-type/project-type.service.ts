import { BaseService } from "@/services/base.service"
import { TProjectType, TProjectTypeForm } from "@/types/project-type"

class ProjectTypeService extends BaseService<TProjectType, TProjectTypeForm> {
  protected endpoint = 'project-types'
}

const projectTypeService = new ProjectTypeService()
export default projectTypeService
