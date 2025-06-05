import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestParams, ResponseBody } from './type'

export const getAllocationParameter = async (
  params: RequestParams['GET']
): Promise<ResponseBody['GET']['AllocationParamList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request',
    params,
  })
  return data
}

export const useQueryGetAllocationParameter = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/allocation-request', params],
    () => getAllocationParameter(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
