import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, ResponseBody } from './type'
import { authAssetApi } from '@/config/auth'

export const getListMaintenanceCard = async (
  params?: RequestParams['GET']['ListMaintenanceCard']
): Promise<ResponseBody['GET']['ListMaintenanceCard']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance-card/follow/list',
    params,
  })
  return data
}
export const useGetListMaintenanceCard = (
  params?: RequestParams['GET']['ListMaintenanceCard'],
  options?: any
) => {
  return useQuery<ResponseBody['GET']['ListMaintenanceCard']>(
    ['/api/v1/maintenance-card/follow/list', params],
    () => getListMaintenanceCard(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const postJobZenForecast = async (requestBody: any): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/maintenance-card/job-forecast',
    data: requestBody,
  })
}
