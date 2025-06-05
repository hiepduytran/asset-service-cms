import { authWarehouseApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getListReceipt = async (params: any): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking/receipt/by-product/list',
    params,
  })
  return data
}

export const useQueryListReceipt = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/stock-picking/receipt/by-product/list', params],
    () => getListReceipt(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
