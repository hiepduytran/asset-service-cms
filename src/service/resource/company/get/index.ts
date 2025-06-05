import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getCompanyById = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/companies',
    params,
  })
  return data
}

export const useQueryGetCompanyById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/companies', params],
    () => getCompanyById(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.id,
    }
  )
}

export const getListCity = async (params: any) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: `/api/v1/cities/list/city-country`,
    params: { ...params },
  })

  return data ? data.data : data
}

export const getListRegion = async (params: any) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: `/api/v1/region/list-by-country`,
    params: { ...params },
  })

  return data ? data.data : data
}

export const getListDistrict = async (params: any) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: `/api/v1/districts/list/district-city`,
    params: { ...params },
  })

  return data ? data.data : data
}

export const getListWard = async (params: any) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: `/api/v1/ward/list/ward-district`,
    params: { ...params },
  })

  return data ? data.data : data
}

export const useQueryGetListRegion = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/region/list-by-country', params],
    () => getListRegion(params),
    { ...defaultOption, ...options, enabled: !!params?.countryId }
  )
}

export const useQueryGetListCity = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/cities/list', params],
    () => getListCity(params),
    { ...defaultOption, ...options, enabled: !!params?.countryId }
  )
}
export const useQueryGetListDistrict = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/districts/list', params],
    () => getListDistrict(params),
    { ...defaultOption, ...options, enabled: !!params?.cityId }
  )
}
export const useQueryGetListWard = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/ward/list', params],
    () => getListWard(params),
    { ...defaultOption, ...options, enabled: !!params?.districtId }
  )
}
