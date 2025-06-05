import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getProblemCategoryList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/problem-category/list',
    params,
  })
  return data
}

export const useQueryproblemCategoryList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/problem-category/list', params],
    () => getProblemCategoryList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
