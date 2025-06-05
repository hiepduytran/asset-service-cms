import { authAssetApi } from '@/config/auth'
import { RequestBody, RequestParams, ResponseBody } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'
import { optionRequest } from '@/enum'

export const getListMaintenancesCard = async (
  params?: RequestParams['GET']
): Promise<ResponseBody['GET']['MaintenanceCard']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance-card/list',
    params,
  })
  return data
}

export const useGetListMaintenancesCard = (
  params?: RequestParams['GET'],
  options?: any
) => {
  return useQuery<ResponseBody['GET']['MaintenanceCard']>(
    ['/api/v1/maintenance-card/list', params],
    () => getListMaintenancesCard(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAllProductAndStandard = async (): Promise<
  ResponseBody['GET']['ProductAndStandard']
> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-maintenance/asset-code/list',
  })
  return data
}

// export const useGetAllProductAndStandard = (options?: any) => {
//   return useQuery<ResponseBody['GET']['ProductAndStandard']>(
//     ['/api/v1/standard-maintenance/asset-code/list'],
//     () => getAllProductAndStandard(),
//     {
//       ...defaultOption,
//       ...options,
//     }
//   )
// }

// export const getAllAccessory = async (
//   params?: RequestParams['Accessory']
// ): Promise<ResponseBody['GET']['Accessory']> => {
//   const { data } = await authAssetApi({
//     method: 'GET',
//     url: '/api/v1/config/accessory/accessory',
//     params,
//   })
//   return data
// }

export const getStandardByIds = async (
  requestBody: RequestBody['GET']['StandardByIds']
): Promise<ResponseBody['GET']['StandardByIds']> => {
  const { data } = await authAssetApi({
    method: 'POST',
    url: '/api/v1/standard-maintenance/standard-by-ids',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const useGetStandardByIds = (
  requestBody: RequestBody['GET']['StandardByIds'],
  options?: any
) => {
  return useQuery<ResponseBody['GET']['StandardByIds']>(
    ['/api/v1/standard-maintenance/standard-by-ids', requestBody],
    () => getStandardByIds(requestBody),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getStandardMethods = async (
  params?: RequestParams['GET']
): Promise<ResponseBody['GET']['StandardMethods']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/standard-method/list',
    params,
  })
  return data
}

export const getRoles = async (): Promise<ResponseBody['GET']['Roles']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/policy-role/roles',
  })
  return data
}

export const useGetRoles = (options?: any) => {
  return useQuery<ResponseBody['GET']['Roles']>(
    ['/api/v1/policy-role/roles'],
    () => getRoles(),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getShifts = async (): Promise<ResponseBody['GET']['Shifts']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/maintenance-card/shift',
  })
  return data
}
