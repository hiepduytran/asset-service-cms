import { authUaaApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ReqGetFeatureOfSystem, ResGetFeatureOfSystem } from './type'

export const URL = '/api/v1/feature/list-by-system'

export const getFeatureOfSystem = async (
  params: ReqGetFeatureOfSystem
): Promise<ResGetFeatureOfSystem> => {
  const { data } = await authUaaApi({
    method: 'get',
    url: URL,
    params,
  })
  return data
}

export const useQueryGetFeatureOfSystem = (
  params: ReqGetFeatureOfSystem,
  options?: any
) => {
  return useQuery<ResGetFeatureOfSystem>(
    [URL, params],
    () => getFeatureOfSystem(params),
    { ...defaultOption, ...options }
  )
}
