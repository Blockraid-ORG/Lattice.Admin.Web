import { BaseService } from "@/services/base.service"
import { TCategory, TFormCategory } from "@/types/category"

class CategoryService extends BaseService<TCategory, TFormCategory> {
  protected endpoint = 'categories'
}

const categoryService = new CategoryService()
export default categoryService
