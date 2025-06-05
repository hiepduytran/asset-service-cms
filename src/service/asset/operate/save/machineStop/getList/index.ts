import { authAssetApi } from '@/config/auth'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getMachineStopList = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/shutdown-information',
    params,
  })
  return data
}

export const useQueryMachineStopList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/shutdown-information', params],
    () => getMachineStopList(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getMachineStopListById = async (params: any): Promise<any> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/shutdown-information/id',
    params,
  })
  return data
}

export const useQueryMachineStopListById = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/shutdown-information/id', params],
    () => getMachineStopListById(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
