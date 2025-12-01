import { BaseService } from "@/services/base.service"
import { TClientApps, TFormClientApps } from "@/types/client-apps"

class ClientApp extends BaseService<TClientApps, TFormClientApps> {
  protected endpoint = 'client-apps'
}

const clientApp = new ClientApp()
export default clientApp
