import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TFormRole, TRole } from "@/types/role"

class RoleService extends BaseService<TRole, TFormRole> {
  protected endpoint = 'roles'
  async GET_ALL() {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint +'/all',
    })
    return response.data.data.map((item: any) => ({
      value: item.id,
      label: item.name,
      logo: item?.logo,
    }))
  }
}

const roleService = new RoleService()
export default roleService
