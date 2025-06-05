import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getMaintenanceForecastingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/forecast/list',
    params,
  })
  return data
}

export const useQueryGetMaintenanceForecastingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/forecast/list', params],
    () => getMaintenanceForecastingList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
