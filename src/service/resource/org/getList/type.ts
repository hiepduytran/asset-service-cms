import { PageResponse } from '@/service/type'

type Org = {
  id: number
  code: string
  name: string
  parentId: number
  parent: string
  companyId: number
  company: string
  description: string
  activated: boolean
  isDefault: boolean
}

export type Response = {
  GET: PageResponse<Org[]>
}

export type RequestBody = {
  GET: {
    search?: string
    isDefaultCompany?: boolean
    companyId?: number | null
    activated?: boolean | null
    page: number
    size: number
  }
}
