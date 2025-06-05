import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getListSeverityManagement = async (
  params: RequestParams
): Promise<Response['ListSeverityManagement']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/severity-management/list',
    params,
  })
  return data
}

export const useQueryGetListSeverityManagement = (
  params: RequestParams,
  options?: any
) => {
  return useQuery<Response['ListSeverityManagement']>(
    ['/api/v1/severity-management/list', params],
    () => getListSeverityManagement(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getListSeverityManagementHigher = async (
  params: RequestParams & {
    levelId?: number
  }
): Promise<Response['ListSeverityManagementHigher']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/severity-management/higher/level',
    params,
  })
  return data
}
