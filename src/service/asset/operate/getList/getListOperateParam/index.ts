import { authAssetApi } from '@/config/auth'
import { RequestParam, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getOperateParameter = async (
  params: RequestParam['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/operate/parameter',
    params,
  })
  return data
}

export const useQueryOperateList = (
  params: RequestParam['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/operate/parameter', params],
    () => getOperateParameter(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
