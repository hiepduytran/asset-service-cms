import { PageResponse } from '@/service/type'

export type ListAssetStatusManagement = {
  id: number
  code: string
  name: string
  isActive: boolean
}

export type RequestParams = {
  managementType: string
  isActive?: boolean
  search?: string
  page: number
  size: number
}

export type Response = {
  ListAssetStatusManagement: PageResponse<ListAssetStatusManagement[]>
}
