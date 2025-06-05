import { BaseResponse } from '@/service/type'
import { RequestBody } from '../list/type'
import { authAssetApi } from '@/config/auth'

export const createStandardDeclare = async (
  requestBody: RequestBody['POST']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/standard-maintenance',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const draftStandardDeclare = async (
  requestBody: RequestBody['POST']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/standard-maintenance',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const updateStandardDeclare = async (
  requestBody: RequestBody['POST']
): Promise<BaseResponse<{ id: number }>> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/standard-maintenance',
    data: {
      ...requestBody,
    },
  })
  return data
}
