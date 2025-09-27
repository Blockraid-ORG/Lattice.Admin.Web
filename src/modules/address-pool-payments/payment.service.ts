import { BaseService } from "@/services/base.service"
import { TFormMasterPayment, TMasterPayment } from "@/types/payment"

class PaymentService extends BaseService<TMasterPayment, TFormMasterPayment> {
  protected endpoint = 'address-pool-payments'
}

const paymentService = new PaymentService()
export default paymentService
