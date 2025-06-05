import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getCard = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/card',
    params,
  })
  return data
}

export const useQueryCard = (params: any, options?: any) => {
  return useQuery<any>(['/api/v1/asset/card', params], () => getCard(params), {
    ...defaultOption,
    ...options,
  })
}
