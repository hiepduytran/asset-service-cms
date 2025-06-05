import { authAssetApi } from '@/config/auth'
import { RequestParam, ResponseBody } from './type'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getImplementMaintenancePlanCheck = async (
  params: RequestParam
): Promise<ResponseBody['GET']['ImplementMaintenancePlanCheck']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/implement-maintenance-plan/checked/list',
    params,
  })
  return data
}

export const useQueryImplementMaintenancePlanCheck = (
  params: RequestParam,
  options?: any
) => {
  return useQuery(
    ['/api/v1/implement-maintenance-plan/checked/list', params],
    () => getImplementMaintenancePlanCheck(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
