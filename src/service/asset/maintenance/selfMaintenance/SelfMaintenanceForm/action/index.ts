import { authAssetApi } from '@/config/auth'
import { BaseResponse } from '@/service/type'
import { RequestBody } from '../list/type'
export const createStandardMaintenanceCard = async (
  requestBody: RequestBody['POST']['MaintenanceCard']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/maintenance-card',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const draftStandardMaintenanceCard = async (
  requestBody: RequestBody['POST']['MaintenanceCard']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/maintenance-card',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const updateStandardMaintenanceCard = async (
  requestBody: RequestBody['POST']['MaintenanceCard']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/maintenance-card',
    data: {
      ...requestBody,
    },
  })
  return data
}
