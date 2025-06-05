import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getProblemCategoryDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/problem-category',
    params,
  })
  return data
}

export const useQueryProblemCategoryDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/problem-category', params],
    () => getProblemCategoryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
