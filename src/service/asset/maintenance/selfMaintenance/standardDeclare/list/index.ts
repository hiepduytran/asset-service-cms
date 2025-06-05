import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
export const getAllStandardMaintenance = async (
  params?: RequestBody['GET']
): Promise<Response['GET']['standardMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-maintenance/list',
    params,
  })
  return data
}
export const useGetAllStandardMaintenance = (
  params?: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['standardMaintenance']>(
    ['/api/v1/standard-maintenance/list', params],
    () => getAllStandardMaintenance(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllAssetAccessory = async (
  params?: RequestBody['GET']
): Promise<Response['GET']['assetAccessory']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/accessory/list',
    params,
  })
  return data
}

export const useGetAllAssetAccessory = (
  params?: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['assetAccessory']>(
    ['/api/v1/config/accessory/list', params],
    () => getAllAssetAccessory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllAccessory = async (
  params?: RequestBody['GET']
): Promise<Response['GET']['accessory']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/accessory/accessory',
    params,
  })
  return data
}

export const useGetAllAccessory = (
  params?: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['accessory']>(
    ['/api/v1/config/accessory/accessory', params],
    () => getAllAccessory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllStandardMethod = async (
  params?: RequestBody['GET']
): Promise<Response['GET']['standardMethods']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-method/list',
    params,
  })
  return data
}

export const useGetAllStandardMethod = (
  params?: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['standardMethods']>(
    ['/api/v1/standard-method/list', params],
    () => getAllStandardMethod(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllGroupStandard = async (): Promise<
  Response['GET']['groupStandard']
> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/standard/simple-list',
  })
  return data
}

export const useGetAllGroupStandard = (options?: any) => {
  return useQuery<Response['GET']['groupStandard']>(
    ['/api/v1/config/standard/simple-list'],
    () => getAllGroupStandard(),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getRoles = async (): Promise<Response['GET']['role']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/policy-role/roles',
  })
  return data
}

export const useGetRoles = (options?: any) => {
  return useQuery<Response['GET']['role']>(
    ['/api/v1/policy-role/roles'],
    () => getRoles(),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllStandardFollow = async (
  params?: RequestBody['GET']
): Promise<Response['GET']['standardMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-maintenance/follow/list',
    params,
  })
  return data
}
export const useGetAllStandardFollow = (
  params?: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']['standardMaintenance']>(
    ['/api/v1/standard-maintenance/follow/list', params],
    () => getAllStandardFollow(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
