import { BaseResponse, PageResponse } from '@/service/type'

export type RequestParams = {
  GET: {
    activated: boolean
  }
}

export type Org = {
  id: number
  code: string
  name: string
  isDefault: boolean
  type: string
}

export type Response = {
  GET: BaseResponse<Org[]>
}
