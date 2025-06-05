import { authAssetApi } from '@/config/auth'
import { RequestBody, ResponseBody } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getImplementMaintenancePlanCheckDetail = async (params: {
  planMaintenanceLineId: number
}): Promise<ResponseBody['GET']['ImplementMaintenancePlanCheckDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/implement-maintenance-plan',
    params,
  })
  return data
}

export const useQueryGetImplementMaintenancePlanCheckDetail = (
  params: { planMaintenanceLineId: number },
  options?: any
) => {
  return useQuery(
    ['/api/v1/implement-maintenance-plan', params],
    () => getImplementMaintenancePlanCheckDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const putImplementMaintenancePlanCheck = async (
  requestBody: RequestBody['PUT']['PutImplementMaintenanceCheckPlan']
): Promise<ResponseBody['PUT']['PutImplementMaintenanceCheckPlan']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/implement-maintenance-plan/check',
    data: {
      ...requestBody,
    },
  })
  return data
}
