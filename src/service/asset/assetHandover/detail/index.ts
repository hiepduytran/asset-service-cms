import { authAssetApi } from '@/config/auth'
import { ResponseBody } from './type'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getTransferAssetDetail = async (params: {
  id: number
}): Promise<ResponseBody['TransferAssetDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/transfer-asset',
    params,
  })
  return data
}

export const useQueryGetTransferAssetDetail = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['TransferAssetDetail']>(
    ['/api/v1/transfer-asset', params],
    () => getTransferAssetDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAssetRecoveryDetail = async (params: {
  id: number
}): Promise<ResponseBody['AssetRecoveryDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-recovery/details/list',
    params,
  })
  return data
}
