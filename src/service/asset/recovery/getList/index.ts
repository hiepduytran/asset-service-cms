import { authAssetApi, authWarehouseApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, Response } from './type'

export const getRecoveryList = async (
  params: RequestBody['GET_LIST']
): Promise<Response['GET_LIST']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-recovery/list',
    params,
  })
  return data
}

export const useQueryRecoveryList = (
  params: RequestBody['GET_LIST'],
  options?: any
) => {
  return useQuery<Response['GET_LIST']>(
    ['/api/v1/asset-recovery/list', params],
    () => getRecoveryList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAssetRecoveryDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-recovery/details/list',
    params,
  })
  return data
}

export const getStockPickingWarehouseReceipt = async (params: {
  orderId: number
}): Promise<Response['StockPickingWarehouseReceipt']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/internal/stock-picking/receipt/simple/list',
    params,
  })
  return data
}

export const useQueryGetStockPickingWarehouseReceipt = (
  params: {
    orderId: number
  },
  options?: any
) => {
  return useQuery<Response['StockPickingWarehouseReceipt']>(
    ['/api/v1/internal/stock-picking/receipt/simple/list', params],
    () => getStockPickingWarehouseReceipt(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getStockPickingWarehouseReceiptDetail = async (params: {
  id: number
}): Promise<Response['StockPickingWarehouseReceiptDetail']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/internal/stock-picking/receipt',
    params,
  })
  return data
}

export const useQueryGetStockPickingWarehouseReceiptDetail = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<Response['StockPickingWarehouseReceiptDetail']>(
    ['/api/v1/internal/stock-picking/receipt', params],
    () => getStockPickingWarehouseReceiptDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

