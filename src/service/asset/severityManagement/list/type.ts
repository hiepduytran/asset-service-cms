import { PageResponse } from '@/service/type'

export type ListSeverityManagement = {
  id: number
  code: string
  name: string
  isActive: boolean
}

export type ListSeverityManagementHigher = {
  id: number
  code: string
  name: string
}

export type RequestParams = {
  managementType: string
  isActive?: boolean
  search?: string
  page: number
  size: number
}

export type Response = {
  ListSeverityManagement: PageResponse<ListSeverityManagement[]>
  ListSeverityManagementHigher: PageResponse<ListSeverityManagementHigher[]>
}
