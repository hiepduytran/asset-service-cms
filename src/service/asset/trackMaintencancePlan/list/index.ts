import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const listPlanMaintenance = async (
  params: RequestBody['GET']
): Promise<Response['GET']['ListPlanMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/follow/list',
    params,
  })
  return data
}

export const useQueryListPlanMaintenance = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['ListPlanMaintenance']>(
    ['/api/v1/plan-maintenance/follow/list', params],
    () => listPlanMaintenance(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const detailPlanMaintenancePlan = async (params: {
  planMaintenanceId: number
}): Promise<Response['GET']['DetailPlanMaintenanceRequest']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/details/request',
    params,
  })
  return data
}

export const useQueryDetailPlanMaintenancePlan = (
  params: {
    planMaintenanceId: number
  },
  options?: any
) => {
  return useQuery<Response['GET']['DetailPlanMaintenanceRequest']>(
    ['/api/v1/plan-maintenance/details/request', params],
    () => detailPlanMaintenancePlan(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
