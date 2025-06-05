import { BaseResponse } from '@/service/type'
export type SeverityManagementDetail = {
  id?: number
  code: string
  name: string
  level: number
  note: string
  isActive: boolean
  managementType: string
  isDefault?: boolean
  isUsed?: boolean
}

export type RequestBody = {
  SeverityManagementDetail: SeverityManagementDetail
}

export type Response = {
  PostSeverityManagement: BaseResponse<{ id: number }>
  PutSeverityManagement: BaseResponse<{ id: number }>
  GetSeverityManagement: BaseResponse<SeverityManagementDetail>
}
