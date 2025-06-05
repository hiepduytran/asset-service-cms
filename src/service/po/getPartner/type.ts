import { BaseResponse, PageResponse } from '@/service/type'

export type Partner = {
  id: number | null
  partnerResponse: {
    id: number
    code: string
    name: string
    email: string
    phoneNumber: string
    address: null
  }
  name: string
}

export type Response = {
  GET: BaseResponse<Partner>
}

export type RequestParams = {
  GET: {
    purchaseCode?: string | null
  }
}
