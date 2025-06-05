import { authProductApi } from '@/config/auth'
import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'

export const getListAsset = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/product/page',
    params,
  })
  return data
}

export const getListAssetByType = async (params: any): Promise<any> => {
  const { data } = await authProductApi({
    method: 'get',
    url: 'api/v1/product/product-with-product-category-by-type',
    params,
  })
  return data
}

export const useQueryListAssetByType = (params: any, options?: any) => {
  return useQuery<any>(
    ['api/v1/product/product-with-product-category-by-type', params],
    () => getListAssetByType(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
