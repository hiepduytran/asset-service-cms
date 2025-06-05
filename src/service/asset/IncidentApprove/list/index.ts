import { authAssetApi } from '@/config/auth'
import { RequestParams, Response } from './type'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getListIncidentApprove = async (
  params?: RequestParams
): Promise<Response['ListIncidentApprove']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/list/approve',
    params,
  })
  return data
}

export const useQueryGetListIncidentApprove = (
  params?: RequestParams,
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording-maintenance/list/approve', params],
    () => getListIncidentApprove(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}


