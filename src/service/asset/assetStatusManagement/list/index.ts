import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getListAssetStatusManagement = async (
  params: RequestParams
): Promise<Response['ListAssetStatusManagement']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset_status_management/list',
    params,
  })
  return data
}

export const useQueryGetListAssetStatusManagement = (
  params: RequestParams,
  options?: any
) => {
  return useQuery<Response['ListAssetStatusManagement']>(
    ['/api/v1/asset_status_management/list', params],
    () => getListAssetStatusManagement(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
