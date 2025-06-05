import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const postAssetStatusManagement = async (
  requestBody: RequestBody['AssetStatusManagementDetail']
): Promise<Response['PostAssetStatusManagement']> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/asset_status_management',
    data: requestBody,
  })
  return data
}

export const putAssetStatusManagement = async (
  requestBody: RequestBody['AssetStatusManagementDetail']
): Promise<Response['PutAssetStatusManagement']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/asset_status_management',
    data: requestBody,
  })
  return data
}

export const deleteAssetStatusManagement = async (params: {
  id: number
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'delete',
    url: '/api/v1/asset_status_management',
    params,
  })
  return data
}

export const getAssetStatusManagement = async (params: {
  id: number
}): Promise<Response['GetAssetStatusManagement']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset_status_management',
    params,
  })
  return data
}
export const useQueryGetAssetStatusManagement = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<Response['GetAssetStatusManagement']>(
    ['/api/v1/asset_status_management', params],
    () => getAssetStatusManagement(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
