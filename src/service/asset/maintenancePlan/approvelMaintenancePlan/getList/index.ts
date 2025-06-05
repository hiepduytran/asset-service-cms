import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getApproveMaintenancePlanList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/approve/list',
    params,
  })
  return data
}

export const useQueryApproveMaintenancePlanList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/plan-maintenance/approve/list', params],
    () => getApproveMaintenancePlanList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
