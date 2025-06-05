import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getAnnualMaintenancePlanDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/plan-maintenance/year',
    params,
  })
  return data
}

export const useQueryAnnualMaintenancePlanDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/plan-maintenance/year', params],
    () => getAnnualMaintenancePlanDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
