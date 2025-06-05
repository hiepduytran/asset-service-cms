import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postRequestAllocationSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/allocation-request',
    data: requestBody,
  })
}

export const putRequestAllocationSave = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/allocation-request',
    data: requestBody,
  })
}

export const getAssetCode = async (params: {
  search?: string
  page: number
  size: number
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/code-asset',
    params,
  })
  return data
}
