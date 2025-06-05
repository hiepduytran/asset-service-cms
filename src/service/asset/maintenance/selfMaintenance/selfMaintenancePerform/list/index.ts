import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ResponseBody } from './type'

export const getListAutoMaintenances = async (params: {
  search?: string
  page: number
  size: number
  departmentIds?: number[]
}): Promise<ResponseBody['GET']['ListAutoMaintenance']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/auto-maintenance/list-asset',
    params,
  })
  return data
}

export const useGetListAutoMaintenances = (
  params: {
    search?: string
    page: number
    size: number
    departmentIds?: number[]
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['ListAutoMaintenance']>(
    ['/api/v1/auto-maintenance/list-asset', params],
    () => getListAutoMaintenances(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
