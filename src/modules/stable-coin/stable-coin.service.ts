import { BaseService } from "@/services/base.service"
import { TFormStableCoin, TStableCoin } from "@/types/stable-coin"

class StableCoinSrvice extends BaseService<TStableCoin, TFormStableCoin> {
  protected endpoint = 'stable-coin'
}

const stableCoinSrvice = new StableCoinSrvice()
export default stableCoinSrvice
