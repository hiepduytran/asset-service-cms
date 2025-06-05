import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { ResponseBody } from './type'
import { defaultOption } from '@/config/reactQuery'

export const getIncidentLogDetail = async (params: {
  id: number
}): Promise<ResponseBody['IncidentDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/incident-recording',
    params,
  })
  return data
}

export const useQueryGetIncidentLogDetail = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['IncidentDetail']>(
    ['/api/v1/incident-recording', params],
    () => getIncidentLogDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
