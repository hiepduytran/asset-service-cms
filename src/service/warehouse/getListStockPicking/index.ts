import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { authWarehouseApi } from '@/config/auth'

export const getListStockPicking = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authWarehouseApi({
    method: 'GET',
    url: '/api/v1/internal/stock-picking/in/tiny/list',
    params,
  })
  return data
}

export const useQueryListStockPicking = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/internal/stock-picking/in/tiny/list', params],
    () => getListStockPicking(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
