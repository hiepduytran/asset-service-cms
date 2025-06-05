import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAssetPeriodList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-period/list',
    params,
  })
  return data
}

export const useQueryGetAssetPeriodList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset-period/list', params],
    () => getAssetPeriodList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
