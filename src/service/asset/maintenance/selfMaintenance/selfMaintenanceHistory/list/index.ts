import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParam, ResponseBody } from './type'

export const getListAutoMaintenancesHistory = async (
  params: RequestParam['LIST']
): Promise<ResponseBody['LIST']['ListAutoMaintenanceHistory']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance/history/list-all',
    params,
  })
  return data
}

export const useGetListAutoMaintenancesHistory = (
  params: RequestParam['LIST'],
  options?: any
) => {
  return useQuery<ResponseBody['LIST']['ListAutoMaintenanceHistory']>(
    ['/api/v1/maintenance/history/list-all', params],
    () => getListAutoMaintenancesHistory(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
