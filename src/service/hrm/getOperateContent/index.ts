import { authAssetApi, authHrmApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getOperateContent = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/operate/content',
    params,
  })
  return data
}

export const useQueryOperateContent = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/operate/content', params],
    () => getOperateContent(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
