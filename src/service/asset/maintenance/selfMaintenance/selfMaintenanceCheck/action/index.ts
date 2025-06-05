import { authAssetApi } from '@/config/auth'
import { DialogPauseMachine, RequestBody, ResponseBody } from './type'

export const putAuditMaintenanceApprove = async (
  requestBody: RequestBody['PUT']['AuditMaintenanceApprove']
): Promise<ResponseBody['PUT']['AuditMaintenanceApprove']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/audit-maintenance/approve',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const putAuditMaintenanceApproveError = async (
  requestBody: RequestBody['PUT']['AuditMaintenanceApproveError']
): Promise<ResponseBody['PUT']['AuditMaintenanceApproveError']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/audit-maintenance/approve-error',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const putAuditMaintenanceConfirmAgain = async (
  requestBody: RequestBody['PUT']['AuditMaintenanceConfirmAgain']
): Promise<ResponseBody['PUT']['AuditMaintenanceConfirmAgain']> => {
  const { data } = await authAssetApi({
    method: 'put',
    url: '/api/v1/audit-maintenance/confirm-again',
    data: {
      ...requestBody,
    },
  })
  return data
}

export const postDialogPauseMachine = async (
  requestBody: DialogPauseMachine
): Promise<{ id: number }> => {
  const { data } = await authAssetApi({
    method: 'post',
    url: '/api/v1/maintenance-schedule-shutdown',
    data: {
      ...requestBody,
    },
  })
  return data
}
