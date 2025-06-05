import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestParams, Response } from './type'

export const getIncidentReport = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-report/id',
    params,
  })
  return data
}

export const useQueryIncidentReport = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/incident-report/id', params],
    () => getIncidentReport(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
