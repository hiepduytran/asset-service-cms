import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getAllocationList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-allocation/list',
    params,
  })
  return data
}

export const useQueryAllocationList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset-allocation/list', params],
    () => getAllocationList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
