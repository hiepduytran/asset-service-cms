import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getIncidentHistoryList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/history/by-asset-id',
    params,
  })
  return data
}

export const useQueryIncidentHistoryList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/incident-recording-maintenance/history/by-asset-id', params],
    () => getIncidentHistoryList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
