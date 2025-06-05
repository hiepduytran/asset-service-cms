import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { RequestBody, RequestParams, Response } from './type'

export const getAssetLotSerial = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/lot-serial',
    params,
  })
  return data
}

export const useQueryAssetLotSerial = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    ['/api/v1/asset/lot-serial', params],
    () => getAssetLotSerial(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const postAssetLotSerial = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'post',
    url: '/api/v1/asset/lot-serial',
    data: requestBody,
  })
}

export const putAssetLotSerial = async (
  requestBody: RequestBody['POST']
): Promise<any> => {
  return await authAssetApi({
    method: 'put',
    url: '/api/v1/asset/lot-serial',
    data: requestBody,
  })
}
