import { authResourceApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParamRegion, ResponseRegionList } from './type'

export const getRegionList = async (
  params: RequestParamRegion['GET']
): Promise<ResponseRegionList['GET']> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/region/list',
    params,
  })
  return data
}

export const useQueryGetRegionList = (
  params: RequestParamRegion['GET'],
  options?: any
) => {
  return useQuery<ResponseRegionList['GET']>(
    ['/api/v1/region/list', params],
    () => getRegionList(params),
    { ...defaultOption, ...options }
  )
}

export const getRegionListByCountryId = async (params: any): Promise<any> => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/region/list-by-country',
    params,
  })
  return data
}

export const useQueryGetRegionListByCountryId = (
  params: RequestParamRegion['GET_BY_COUNTRY_ID'],
  options?: any
) => {
  return useQuery<ResponseRegionList['GET_BY_COUNTRY_ID']>(
    ['/api/v1/region/list-by-country', params],
    () => getRegionListByCountryId(params),
    { ...defaultOption, ...options }
  )
}
