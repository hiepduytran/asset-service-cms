import { defaultOption } from '@/config/reactQuery'
import { useQuery } from 'react-query'
import { DetailStandardDeclare, ResDetailStandardDeclare } from './type'
import { authAssetApi } from '@/config/auth'

export const getDetailStandardDeclare = async (params: {
  id: number
}): Promise<ResDetailStandardDeclare> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/standard-maintenance',
    params,
  })
  return data
}

export const useGetDetailStandardDeclare = (
  params: {
    id: number
  },
  options?: any
) => {
  return useQuery<ResDetailStandardDeclare>(
    ['/api/v1/standard-maintenance', params],
    () => getDetailStandardDeclare(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
