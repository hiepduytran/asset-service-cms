import { authWarehouseApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import { defaultOption } from '@/config/reactQuery'

export const getLot = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: `/api/v1/internal/stock-picking/in/lots/list`,
    params: params,
  })

  return data
}

export const useQueryGetUnits = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [`/api/v1/internal/stock-picking/in/lots/list`, params],
    () => getLot({ ...params }),
    { ...defaultOption, ...options }
  )
}
