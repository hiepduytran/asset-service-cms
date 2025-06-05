import { authWarehouseApi } from '@/config/auth'
import { ResponseBody } from './type'

export const getStockPickingReceiptProductId = async (params: {
  warehouseTypes: string
  productIds: number
}): Promise<ResponseBody['LIST']['StockPickingReceiptProductId']> => {
  const { data } = await authWarehouseApi({
    method: 'GET',
    url: '/api/v1/inventory/product/list',
    params,
  })
  return data
}
