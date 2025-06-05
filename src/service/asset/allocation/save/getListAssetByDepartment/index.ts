import { authAssetApi } from '@/config/auth'

export const getListAssetByDepartment = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset-allocation/asset-to-department',
    params,
  })
  return data
}
