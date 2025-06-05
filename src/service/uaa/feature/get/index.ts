import { authUaaApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import {
  ReqGetFeatureDetail,
  ReqGetFeatureList,
  ResGetFeatureDetail,
  ResGetFeatureList,
} from './type'

export const END_POINT_FEATURE = '/api/v1/feature'

export const getFeatureList = async (
  params: ReqGetFeatureList
): Promise<ResGetFeatureList> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT_FEATURE + '/list',
    params,
  })
  return data
}

export const useQueryGetFeatureList = (
  params: ReqGetFeatureList,
  options?: any
) => {
  return useQuery<ResGetFeatureList>(
    [END_POINT_FEATURE + '/list', params],
    () => getFeatureList(params),
    { ...defaultOption, ...options }
  )
}

export const getFeatureDetail = async (
  params: ReqGetFeatureDetail
): Promise<ResGetFeatureDetail> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: END_POINT_FEATURE,
    params,
  })
  return data
}

export const useQueryGetFeatureDetail = (
  params: ReqGetFeatureDetail,
  options?: any
) => {
  return useQuery<ResGetFeatureDetail>(
    [END_POINT_FEATURE, params],
    () => getFeatureDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
