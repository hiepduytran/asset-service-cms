import { PageResponse } from '@/service/type'

type Org = {
  id: number
  code: string
  name: string
  isDefault: boolean
  type: string
  activated?: boolean
}

export type Response = {
  GET: PageResponse<Org[]>
}

export type RequestBody = {
  GET: {
    search?: string
    companyId?: number
    isDefaultCompany: boolean
    orgNowId?: number
    activated?: boolean
    page: number
    size: number
  }
}
