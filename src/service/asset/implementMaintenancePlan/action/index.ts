import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, ResponseBody } from './type'

export const getImplementMaintenancePlanDetail = async (params: {
  planMaintenanceLineId: number
}): Promise<ResponseBody['GET']['ImplementMaintenancePlanDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/implement-maintenance-plan',
    params,
  })
  return data
}

export const useQueryGetImplementMaintenancePlanDetail = (
  params: { planMaintenanceLineId: number },
  options?: any
) => {
  return useQuery(
    ['/api/v1/implement-maintenance-plan', params],
    () => getImplementMaintenancePlanDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const putImplementMaintenancePlan = async (
  requestBody: RequestBody['PUT']['PutImplementMaintenancePlan']
): Promise<ResponseBody['PUT']['PutImplementMaintenancePlan']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/implement-maintenance-plan',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const putImplementMaintenancePlanDraftFinish = async (
  requestBody: RequestBody['PUT']['PutImplementMaintenancePlan']
): Promise<ResponseBody['PUT']['PutImplementMaintenancePlan']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/implement-maintenance-plan/update',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const getAssetAccessoryList = async (params: {
  productId: number
}): Promise<ResponseBody['GET']['AssetAccessoryList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}
