import { authAssetApi } from '@/config/auth'
import {
  RequestBody,
  RequestBodyIdentifierCode,
  Response,
  ResponseIdentifierCode,
} from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

// Asset Code
export const getAssetDeclarationCategoryList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/list',
    params,
  })
  return data
}

export const useQueryAssetDeclarationCategoryList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/asset/list', params],
    () => getAssetDeclarationCategoryList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

// Identifier Code
export const getAssetDeclarationCategoryListIdentifierCode = async (
  params: RequestBodyIdentifierCode['GET']
): Promise<ResponseIdentifierCode['GET']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/asset/list/asset-code',
    params,
  })
  return data
}

export const useQueryAssetDeclarationCategoryListIdentifierCode = (
  params: RequestBodyIdentifierCode['GET'],
  options?: any
) => {
  return useQuery<ResponseIdentifierCode['GET']>(
    ['/api/v1/asset/list/asset-code', params],
    () => getAssetDeclarationCategoryListIdentifierCode(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
