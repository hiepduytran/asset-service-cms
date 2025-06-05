import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const postSeverityManagement = async (
  requestBody: RequestBody['SeverityManagementDetail']
): Promise<Response['PostSeverityManagement']> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/severity-management',
    data: requestBody,
  })
  return data
}

export const putSeverityManagement = async (
  requestBody: RequestBody['SeverityManagementDetail']
): Promise<Response['PutSeverityManagement']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/severity-management',
    data: requestBody,
  })
  return data
}

export const getSeverityManagement = async (params: {
  id: number
}): Promise<Response['GetSeverityManagement']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/severity-management',
    params,
  })
  return data
}
export const useQueryGetSeverityManagement = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<Response['GetSeverityManagement']>(
    ['/api/v1/severity-management', params],
    () => getSeverityManagement(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const deleteSeverityManagement = async (params: {
  id: number
}): Promise<Response['GetSeverityManagement']> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/severity-management',
    params,
  })
  return data
}
export const useQueryDeleteSeverityManagement = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<Response['GetSeverityManagement']>(
    ['/api/v1/severity-management', params],
    () => deleteSeverityManagement(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
