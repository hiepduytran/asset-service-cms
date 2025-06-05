import { authProductApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getAttributeByProductId = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/internal/mobile-product-template/variant',
    params,
  })
  return data
}

export const useQueryAttributeByProductId = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/internal/mobile-product-template/variant', params],
    () => getAttributeByProductId(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
