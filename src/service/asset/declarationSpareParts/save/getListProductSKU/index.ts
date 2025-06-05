import { authAssetApi } from '@/config/auth'

export const getListProductSKU = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/config/accessory/list/product',
    params,
  })
  return data
}
