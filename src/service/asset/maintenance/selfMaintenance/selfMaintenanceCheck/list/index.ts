import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ResponseBody } from './type'

export const getListAutoMaintenancesCheck = async (params: {
  search?: string
  page: number
  size: number
  status?: string
}): Promise<ResponseBody['GET']['AuditMaintenanceList']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/audit-maintenance/list',
    params,
  })
  return data
}

export const useGetListAutoMaintenancesCheck = (
  params: {
    search?: string
    page: number
    size: number
    status?: string
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AuditMaintenanceList']>(
    ['/api/v1/audit-maintenance/list', params],
    () => getListAutoMaintenancesCheck(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
