import { authAssetApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { ResponseBody } from './type'

export const getAssetRecoveryDetail = async (params: {
  id: number
}): Promise<ResponseBody['AssetRecoveryDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset-recovery',
    params,
  })
  return data
}

export const useQueryAssetRecoveryDetail = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset-recovery', params],
    () => getAssetRecoveryDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
