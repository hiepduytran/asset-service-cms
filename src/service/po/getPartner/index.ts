import { RequestParams, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { authPOApi } from '@/config/auth'

export const getListPartnerAsset = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authPOApi({
    method: 'GET',
    url: '/api/v1/purchase-order/code',
    params,
  })
  return data
}

export const useQueryListPartner = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/purchase-order/code', params],
    () => getListPartnerAsset(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
