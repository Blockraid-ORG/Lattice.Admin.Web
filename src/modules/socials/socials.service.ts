import { BaseService } from "@/services/base.service"
import { TFormSocial, TSocial } from "@/types/social"

class SocialService extends BaseService<TSocial, TFormSocial> {
  protected endpoint = 'socials'
}

const socialService = new SocialService()
export default socialService
