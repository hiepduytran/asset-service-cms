import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { Response } from './type'

export const getDetailMaintenancesCard = async (params: {
  maintenanceCardId: number
}): Promise<Response['GET']['DetailMaintenancesCard']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/maintenance-card',
    params,
  })
  return data
}

export const useDetailMaintenancesCard = (
  params: {
    maintenanceCardId: number
  },
  options?: any
) => {
  return useQuery<Response['GET']['DetailMaintenancesCard']>(
    ['/api/v1/maintenance-card', params],
    () => getDetailMaintenancesCard(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
