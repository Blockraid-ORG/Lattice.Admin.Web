import { BaseService } from "@/services/base.service"
import { TFormSocial, TSocial } from "@/types/social"

class SocialService extends BaseService<TSocial, TFormSocial> {
  protected endpoint = 'master/socials'
}

const socialService = new SocialService()
export default socialService
