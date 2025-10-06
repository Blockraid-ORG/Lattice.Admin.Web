import axiosInstance from "@/lib/axios"
import { BaseService } from "@/services/base.service"
import { TOptionList } from "@/types/common"
import { TFormStableCoin, TStableCoin } from "@/types/stable-coin"

class StableCoinSrvice extends BaseService<TStableCoin, TFormStableCoin> {
  protected endpoint = 'stable-coin'
  async LISTS(): Promise<TOptionList[]> {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint,
      params: {
        noPaginate: 1
      }
    })
    return response.data.data.map((item: any) => ({
      value: item.id,
      label: `${item.address} (${item.stableCoin.name}-${item.chain.name})`,
    }))
  }
}

const stableCoinSrvice = new StableCoinSrvice()
export default stableCoinSrvice
