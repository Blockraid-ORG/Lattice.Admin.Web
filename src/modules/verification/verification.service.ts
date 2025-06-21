import { BaseService } from "@/services/base.service"
import { TFormVerification, TVerification } from "@/types/verifications"

class VerificationnService extends BaseService<TVerification, TFormVerification> {
  protected endpoint = 'master/verifications'
}

const verificationnService = new VerificationnService()
export default verificationnService
