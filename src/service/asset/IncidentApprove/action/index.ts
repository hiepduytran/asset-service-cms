import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { IncidentApproveAction, Response } from './type'
import { useQuery } from 'react-query'

export const getDetailIncidentApprove = async (params: {
  id: number
}): Promise<Response['DetailIncidentApprove']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/detail/history',
    params,
  })
  return data
}

export const useQueryGetDetailIncidentApprove = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-recording-maintenance/detail/history', params],
    () => getDetailIncidentApprove(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const incidentApprove = async (
  requestBody: IncidentApproveAction
): Promise<Response['DetailIncidentApprove']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/incident-report/approve',
    data: requestBody,
  })
  return data
}
