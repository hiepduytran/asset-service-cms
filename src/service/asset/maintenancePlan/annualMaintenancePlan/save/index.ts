import { authAssetApi } from '@/config/auth'
import { RequestBody } from '../../weeklyMaintenancePlan/save/type'

export const postMaintenancePlanYear = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/plan-maintenance/year',
    data: requestBody,
  })
}
export const putMaintenancePlanYear = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/plan-maintenance/year',
    data: requestBody,
  })
}

export const postMaintenancePlanTroubleshooting = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/plan-maintenance/problem',
    data: requestBody,
  })
}
export const putMaintenancePlanTroubleshooting = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/plan-maintenance/problem',
    data: requestBody,
  })
}
