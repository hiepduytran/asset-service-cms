import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getRepairUnitList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/partner-asset-map/list',
    params,
  })
  return data
}

export const useQueryRepairUnitList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/partner-asset-map/list', params],
    () => getRepairUnitList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
