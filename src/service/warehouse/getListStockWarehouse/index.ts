import { authWarehouseApi } from '@/config/auth'

export const getListStockWarehouse = async (params: any): Promise<any> => {
  const { data } = await authWarehouseApi({
    method: 'GET',
    url: '/api/v1/internal/stock-warehouse/list',
    params,
  })
  return data
}
