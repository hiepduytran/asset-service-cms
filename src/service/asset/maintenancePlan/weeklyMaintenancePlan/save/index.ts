import { authAssetApi } from '@/config/auth'
import { RequestBody } from './type'

export const postMaintenancePlan = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/plan-maintenance',
    data: requestBody,
  })
}

export const putMaintenancePlan = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/plan-maintenance',
    data: requestBody,
  })
}

export const postMaintenancePlanAriseWeek = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/arise-week',
    data: requestBody,
  })
}

export const putMaintenancePlanAriseWeek = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/arise-week',
    data: requestBody,
  })
}
