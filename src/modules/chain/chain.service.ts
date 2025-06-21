import { TChain, TFormChain } from "@/types/chain"
import { BaseService } from "@/services/base.service"

class ChainService extends BaseService<TChain, TFormChain> {
  protected endpoint = 'chains'
}

const chainService = new ChainService()
export default chainService
