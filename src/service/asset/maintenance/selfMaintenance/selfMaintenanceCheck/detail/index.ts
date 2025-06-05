import { authAssetApi, authResourceApi } from '@/config/auth'
import { ResponseBody } from './type'
import { useQuery } from 'react-query'
import { defaultOption } from '@/config/reactQuery'

export const getAuditMaintenances = async (params: {
  maintenanceScheduleId: number
}): Promise<ResponseBody['GET']['AuditMaintenances']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/audit-maintenance',
    params,
  })
  return data
}

export const useGetAuditMaintenances = (
  params: { maintenanceScheduleId: number },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AuditMaintenances']>(
    ['/api/v1/audit-maintenance', params],
    () => getAuditMaintenances(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAuditMaintenanceDetail = async (params: {
  maintenanceShiftId: number
  roleId: number
}): Promise<ResponseBody['GET']['AuditMaintenanceDetail']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/audit-maintenance/detail',
    params,
  })
  return data
}

export const useAuditMaintenanceDetail = (
  params: {
    maintenanceShiftId: number
    roleId: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AuditMaintenanceDetail']>(
    ['/api/v1/audit-maintenance/detail', params],
    () => getAuditMaintenanceDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAuditFinalSequence = async (params: {
  maintenanceShiftId: number
  maintenanceScheduleId: number
  isOrigin?: boolean
  roleIdOfConfirm?: number
}): Promise<ResponseBody['GET']['AuditFinalSequence']> => {
  const { data } = await authAssetApi({
    method: 'get',
    url: '/api/v1/audit-maintenance/list/final-sequence',
    params,
  })
  return data
}

export const useAuditFinalSequence = (
  params: {
    maintenanceShiftId: number
    maintenanceScheduleId: number
    isOrigin?: boolean
    roleIdOfConfirm?: number
  },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AuditFinalSequence']>(
    ['/api/v1/audit-maintenance/list/final-sequence', params],
    () => getAuditFinalSequence(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAutoMaintenanceErrorDetail = async (params: {
  shiftSequenceId: number
}): Promise<ResponseBody['GET']['AutoMaintenanceError']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/audit-maintenance/error',
    params,
  })
  return data
}

export const useGetAutoMaintenanceErrorDetail = (
  params: { shiftSequenceId: number },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AutoMaintenanceError']>(
    ['/api/v1/audit-maintenance/error', params],
    () => getAutoMaintenanceErrorDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getAutoMaintenanceFinalErrorDetail = async (params: {
  shiftSequenceId: number
}): Promise<ResponseBody['GET']['AutoMaintenanceError']> => {
  const { data } = await authAssetApi({
    method: 'GET',
    url: '/api/v1/audit-maintenance/confirm-again/error',
    params,
  })
  return data
}

export const useGetAutoMaintenanceFinalErrorDetail = (
  params: { shiftSequenceId: number },
  options?: any
) => {
  return useQuery<ResponseBody['GET']['AutoMaintenanceError']>(
    ['/api/v1/audit-maintenance/confirm-again/error', params],
    () => getAutoMaintenanceFinalErrorDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}

export const getInfoUser = async (params: {
  userId: number
}): Promise<ResponseBody['GET']['InfoUser']> => {
  const { data } = await authResourceApi({
    method: 'GET',
    url: '/api/v1/employee/info-by-user',
    params,
  })
  return data
}

export const useGetInfoUser = (params: { userId: number }, options?: any) => {
  return useQuery<ResponseBody['GET']['InfoUser']>(
    ['/api/v1/employee/info-by-user', params],
    () => getInfoUser(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
