import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getMaintenanceAccessoryDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/maintenance',
    params,
  })
  return data
}

export const useQueryGetMaintenanceAccessoryDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/config/maintenance', params],
    () => getMaintenanceAccessoryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
