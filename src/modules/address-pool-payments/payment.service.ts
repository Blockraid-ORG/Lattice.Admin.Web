import axiosInstance from "@/lib/axios";
import { BaseService } from "@/services/base.service"
import { TFormMasterPayment, TMasterPayment } from "@/types/payment"

class PaymentService extends BaseService<TMasterPayment, TFormMasterPayment> {
  protected endpoint = 'address-pool-payments'
  async SET_STATUS(id: string, status: boolean): Promise<TMasterPayment> {
    const response = await axiosInstance({
      method: 'PATCH',
      url: `${this.endpoint}/${id}`,
      data: { status }
    })
    return response.data;
  }
}

const paymentService = new PaymentService()
export default paymentService
