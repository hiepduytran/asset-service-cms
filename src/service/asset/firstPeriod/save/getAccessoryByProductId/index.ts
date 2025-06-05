import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAccessoryByProductId = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}

export const useQueryGetAccessoryByProductId = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/config/accessory/accessory', params],
    () => getAccessoryByProductId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
