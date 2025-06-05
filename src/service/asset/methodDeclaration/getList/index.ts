import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getMethodDeclarationList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/standard-method/list',
    params,
  })
  return data
}

export const useQueryMethodDeclarationList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/standard-method/list', params],
    () => getMethodDeclarationList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
