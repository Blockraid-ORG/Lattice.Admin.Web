import axiosInstance from "@/lib/axios"
import { TPagination } from "@/types/pagination"
import { TOptionList } from "@/types/common"
import { TQueryParam } from "@/types/query"

export abstract class BaseService<T, TForm = Partial<T>, TResponse= T> {
  protected abstract endpoint: string;

  async LISTS(): Promise<TOptionList[]> {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint,
      params: { noPaginate: 1 }
    })
    return response.data.data.map((item: any) => ({
      value: item.id,
      label: item.name,
      logo: item?.logo,
    }))
  }

  async GET(params?: TQueryParam): Promise<TPagination<T>> {
    const response = await axiosInstance({
      method: 'GET',
      url: this.endpoint,
      params
    })
    return response.data.data
  }
  async DETAIL(id: string): Promise<TResponse> {
    const response = await axiosInstance({
      method: 'GET',
      url: `${this.endpoint}/${id}`,
    });
    return response.data.data;
  }

  async CREATE(form: TForm): Promise<TResponse> {
    const response = await axiosInstance({
      method: 'POST',
      url: this.endpoint,
      data: form
    })
    return response.data.data
  }

  async DELETE(id: string): Promise<TResponse> {
    const response = await axiosInstance({
      method: 'DELETE',
      url: `${this.endpoint}/${id}`,
    })
    return response.data.data
  }

  async UPDATE(id: string, data: TForm): Promise<TResponse> {

    const response = await axiosInstance({
      method: 'PATCH',
      url: `${this.endpoint}/${id}`,
      data
    })
    return response.data.data
  }
}
