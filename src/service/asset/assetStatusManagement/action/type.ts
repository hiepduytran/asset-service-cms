import { BaseResponse } from '@/service/type'

export type AssetStatusManagementDetail = {
  id?: number
  code: string
  name: string
  level: number
  note: string
  managementType: string
  isActive: boolean
  isDefault?: boolean
  isUsed?: boolean
}

export type RequestBody = {
  AssetStatusManagementDetail: AssetStatusManagementDetail
}

export type Response = {
  PostAssetStatusManagement: BaseResponse<{ id: number }>
  PutAssetStatusManagement: BaseResponse<{ id: number }>
  GetAssetStatusManagement: BaseResponse<AssetStatusManagementDetail>
}
