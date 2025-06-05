import { authAssetApi, authPOApi, authResourceApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getRequestAllocationList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/allocation-request/list',
    params,
  })
  return data
}

export const useQueryGetRequestAllocationList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/plan-maintenance/follow/list', params],
    () => getRequestAllocationList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllOrg = async (params: {
  search: string
  page: number
  size: number
}) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/user-org-map/list',
    params: {
      ...params,
      activated: true,
    },
  })
  return data
}

export const getAllDepartment = async (params: {
  search: string
  page: number
  size: number
}) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/department/list',
    params,
  })
  return data
}

export const getAllEmployee = async (params: {
  search: string
  page: number
  size: number
}) => {
  const { data } = await authResourceApi({
    method: 'get',
    url: '/api/v1/employee/list',
    params,
  })
  return data
}

export const getProductInternalRequest = async (params: {
  search: string
  page: number
  size: number
}) => {
  const { data } = await authPOApi({
    method: 'get',
    url: '/api/v1/product-internal-request/list',
    params,
  })
  return data
}
