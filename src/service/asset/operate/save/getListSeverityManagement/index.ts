import { authAssetApi } from '@/config/auth'

export const getListSeverityManagement = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/severity-management/list',
    params,
  })
  return data
}

// filter by id
export const getListSeverityManagementFilter = async (
  params: any
): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/severity-management/higher/level',
    params,
  })
  return data
}
