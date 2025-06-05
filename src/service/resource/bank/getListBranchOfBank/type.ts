import { PageResponse } from '@/service/type'

export type Org = {
  id: number
  code: string
  name: string
}

export type Response = {
  GET: PageResponse<Org[]>
}

export type RequestBody = {
  GET: {
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}

export type RequestParams = {
  GET: {
    bankId: number
    search?: string | null
    page: number
    size: number
    activated: boolean
  }
}
