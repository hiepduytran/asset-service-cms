import { BaseResponse } from '@/service/type'

export type BankDetailType = {
  id: number
  code: string
  name: string
}

export type ResponseBankDetail = {
  GET_DETAIL: BaseResponse<BankDetailType>
}
