import { authAssetApi } from '@/config/auth'

export const generateCode = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/generate-code',
    params,
  })
  return data
}
