import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getAccessoryDemandForecastingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/forecast/accessory',
    params,
  })
  return data
}

export const useQueryGetAccessoryDemandForecastingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/forecast/accessory', params],
    () => getAccessoryDemandForecastingList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
