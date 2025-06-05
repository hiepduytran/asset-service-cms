import { PageResponse } from '@/service/type'

export type Lot = {
  id: number
  code: string
}

export type Response = {
  GET: PageResponse<Lot[]>
}

export type RequestParams = {
  GET: {
    pickingId: number
    productId: number
  }
}
