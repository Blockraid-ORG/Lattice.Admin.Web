import axiosInstance from "@/lib/axios";
import { BaseService } from "@/services/base.service";
import {
  TFormApproveMember,
  TFormChangeCategoryMember,
  TFormChangeTypeMember,
  TFormRejectMember,
  TMember,
  TMemberDetail
} from "@/types/member";

class MemberService extends BaseService<TMember> {
  protected endpoint = 'members'
  async DETAIL(id: string): Promise<TMemberDetail> {
    const response = await axiosInstance({
      method: 'GET',
      url: `${this.endpoint}/${id}`,
    });
    return response.data.data;
  }
  async CHANGE_CATEGORY(data: TFormChangeCategoryMember){
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/sign-category`,
      data
    });
    return response.data;
  }
  async CHANGE_TYPE(data: TFormChangeTypeMember){
    const response = await axiosInstance({
      method: 'POST',
      url: `${this.endpoint}/sign-type`,
      data
    });
    return response.data;
  }
  async REJECT(data: TFormRejectMember){
    const response = await axiosInstance({
      method: 'POST',
      url: `member-verifications/reject`,
      data
    });
    return response.data;
  }
  async APPROVE(data: TFormApproveMember){
    const response = await axiosInstance({
      method: 'POST',
      url: `member-verifications/approve`,
      data
    });
    return response.data;
  }
}

const memberService = new MemberService()
export default memberService
