import { BaseService } from "@/services/base.service"
import { TFormRole, TRole } from "@/types/role"

class RoleService extends BaseService<TRole, TFormRole> {
  protected endpoint = 'roles'
}

const roleService = new RoleService()
export default roleService
