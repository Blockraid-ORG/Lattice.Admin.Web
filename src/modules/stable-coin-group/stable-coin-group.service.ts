import { BaseService } from "@/services/base.service"
import { TFormSTCGroup, TSTCGroup } from "@/types/stable-coin-group"

class STCGroupService extends BaseService<TSTCGroup, TFormSTCGroup> {
  protected endpoint = 'stable-coin-group'
}

const sTCGroupService = new STCGroupService()
export default sTCGroupService
