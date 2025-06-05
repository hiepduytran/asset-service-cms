import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParam, ResponseBody } from './type'

export const getImplementMaintenancePlanList = async (
  params: RequestParam['GET']['ImplementMaintenancePlanList']
): Promise<ResponseBody['GET']['ImplementMaintenancePlanList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/implement-maintenance-plan/list',
    params,
  })
  return data
}

export const useQueryGetImplementMaintenancePlanList = (
  params: RequestParam['GET']['ImplementMaintenancePlanList'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/implement-maintenance-plan/list', params],
    () => getImplementMaintenancePlanList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getImplementMaintenancePlanDetailList = async (params: {
  planMaintenanceId: number
}): Promise<ResponseBody['GET']['ImplementMaintenancePlanDetailList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/implement-maintenance-plan/details/list',
    params,
  })
  return data
}

export const getImplementMaintenancePlanLTask = async (params: {
  assetId: number
  planMaintenanceId: number
}): Promise<ResponseBody['GET']['ImplementMaintenancePlanLTask']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/task',
    params,
  })
  return data
}

export const useQueryGetImplementMaintenancePlanTask = (
  params: { assetId: number; planMaintenanceId: number },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['ImplementMaintenancePlanLTask']>(
    ['/api/v1/plan-maintenance/task', params],
    () => getImplementMaintenancePlanLTask(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
