import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getListCodes = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset/codes',
    params,
  })
  return data
}

export const getListCodeAsset = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset/code-asset',
    params,
  })
  return data
}

export const getListCodesRecovery = async (params: {
  allocationChooseType?: string
  orgId?: number
  departmentId?: number
  employeeId?: number
  removeIds: number[]
}): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset/get-by',
    params: params,
  })
  return data
}

export const useQueryListCodeAsset = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/asset/get-by', params],
    () => getListCodes(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAssetList = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/list',
    params,
  })
  return data
}

export const useQueryAssetList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/asset/list', params],
    () => getAssetList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAssetListByProductId = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/asset-by-productId',
    params,
  })
  return data
}

export const useQueryAssetListByProductId = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/asset/asset-by-productId', params],
    () => getAssetListByProductId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
