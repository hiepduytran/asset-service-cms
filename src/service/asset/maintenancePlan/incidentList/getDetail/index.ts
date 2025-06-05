import { authAssetApi } from '@/config/auth'
import { RequestBody, Response } from './type'

export const getIncidentListDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/auto-maintenance/list/detail-problem',
    params,
  })
  return data
}

export const getIncidentListDangerousDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/auto-maintenance/list/dangerous/detail-problem',
    params,
  })
  return data
}
