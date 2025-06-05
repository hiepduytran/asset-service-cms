import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, ResponseBody } from './type'
import { authAssetApi } from '@/config/auth'

export const listPlanMaintenanceAllocation = async (
  params: RequestBody['GET']
): Promise<ResponseBody['GET']['ListPlanMaintenanceAllocation']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/allocation/follow/list',
    params: params,
  })
  return data
}

export const useQueryListPlanMaintenanceAllocation = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<ResponseBody['GET']['ListPlanMaintenanceAllocation']>(
    ['', params],
    () => listPlanMaintenanceAllocation(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const planMaintenanceAllocationChild = async (params: {
  planMaintenanceId: number
}): Promise<ResponseBody['GET']['ListPlanMaintenanceAllocationChild']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/details/allocation/follow/list',
    params,
  })
  return data
}

export const useQueryPlanMaintenanceAllocationChild = (
  params: {
    planMaintenanceId: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['ListPlanMaintenanceAllocationChild']>(
    ['/api/v1/plan-maintenance/details/allocation/follow/list', params],
    () => planMaintenanceAllocationChild(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
