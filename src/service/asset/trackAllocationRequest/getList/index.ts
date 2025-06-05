import { authAssetApi, authWarehouseApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getTrackAllocationRequestList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/follow/list',
    params,
  })
  return data
}

export const useQueryGetTrackAllocationRequestList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/allocation-request/follow/list', params],
    () => getTrackAllocationRequestList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getStockPickingDelivery = async (params: {
  orderId: number
}): Promise<Response['StockPickingDelivery']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/internal/stock-picking/delivery/simple/list',
    params,
  })
  return data
}

export const useQueryGetStockPickingDelivery = (
  params: {
    orderId: number
  },
  options?: any
) => {
  return useQuery<Response['StockPickingDelivery']>(
    ['/api/v1/internal/stock-picking/delivery/simple/list', params],
    () => getStockPickingDelivery(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getStockPickingDeliveryDetail = async (params: {
  id: number
}): Promise<Response['StockPickingDeliveryDetail']> => {
  const { data } = await authWarehouseApi({
    method: 'get',
    url: '/api/v1/internal/stock-picking/delivery',
    params,
  })
  return data
}

export const useQueryGetStockPickingDeliveryDetail = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<Response['StockPickingDeliveryDetail']>(
    ['/api/v1/internal/stock-picking/delivery', params],
    () => getStockPickingDeliveryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllocationRequestAssetList = async (params: {
  productId: number
  cardId: number
}): Promise<Response['AllocationRequestAssetList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/asset/list',
    params,
  })
  return data
}

export const useQueryGetAllocationRequestAssetList = (
  params: {
    productId: number
    cardId: number
  },
  options?: any
) => {
  return useQuery<Response['AllocationRequestAssetList']>(
    ['/api/v1/allocation-request/asset/list', params],
    () => getAllocationRequestAssetList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
