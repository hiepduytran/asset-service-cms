import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getListDICByProductId = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/by-productId/list-dic',
    params,
  })
  return data
}

export const useQueryListDICByProductId = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/asset/by-productId/list-dic', params],
    () => getListDICByProductId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
