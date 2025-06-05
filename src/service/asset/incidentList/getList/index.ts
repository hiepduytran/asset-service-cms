import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getIncidentList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording-maintenance/follow-list',
    params,
  })
  return data
}

export const useQueryIncidentList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/incident-recording-maintenance/follow-list', params],
    () => getIncidentList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
