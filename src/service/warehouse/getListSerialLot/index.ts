import { authWarehouseApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

// DEFAULT AND LOTS
export const getListSerialLot = async (params: any): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking/receipt/serial-lot/list',
    params,
  })
  return data
}

export const useQueryListSerialLot = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/stock-picking/receipt/serial-lot/list', params],
    () => getListSerialLot(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

// ALL AND SERIAL
export const getListSerialLotIdentified = async (params: any): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/stock-picking/receipt/serials/list',
    params,
  })
  return data
}
