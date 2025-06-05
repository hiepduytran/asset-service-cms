import { authAssetApi, authProductApi } from '@/config/auth'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getListUnit = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authProductApi({
    method: 'get',
    url: '/api/v1/unit/list',
    params,
  })
  return data
}

// export const useQueryParamAsset = (
//   params: RequestBody['GET'],
//   options?: any
// ) => {
//   return useQuery<Response['GET']>(
//     ['/api/v1/asset/codes', params],
//     () => getParamAsset(params),
//     {
//       ...defaultOption,
//       ...options,
//     }
//   )
// }
