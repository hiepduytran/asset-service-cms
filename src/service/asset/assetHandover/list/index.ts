import { authAssetApi } from '@/config/auth'
import { RequestParam, ResponseBody } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getTransferAssetList = async (
  params: RequestParam['LIST']
): Promise<ResponseBody['TransferAssetList']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/transfer-asset/list',
    params,
  })
  return data
}

export const useQueryGetTransferAssetList = (
  params: RequestParam['LIST'],
  options?: any
) => {
  return useQuery<ResponseBody['TransferAssetList']>(
    ['/api/v1/transfer-asset/list', params],
    () => getTransferAssetList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
