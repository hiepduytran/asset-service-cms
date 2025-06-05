import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getRepairUnitDetail = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/partner-asset-map',
    params,
  })
  return data
}

export const useQueryRepairUnitDetail = (params: any, options?: any) => {
  return useQuery(
    ['/api/v1/partner-asset-map', params],
    () => getRepairUnitDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
