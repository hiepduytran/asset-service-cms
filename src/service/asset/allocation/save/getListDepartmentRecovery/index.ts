import { authAssetApi } from '@/config/auth'

export const getListDepartmentRecovery = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/asset-allocation/department/list',
    params,
  })
  return data
}
