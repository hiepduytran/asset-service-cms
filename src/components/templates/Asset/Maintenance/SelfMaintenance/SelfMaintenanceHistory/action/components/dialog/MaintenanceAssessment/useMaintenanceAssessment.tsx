import { TRANSLATE } from '@/routes'
import { useAuditFinalSequence } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail'
import { MaintenanceHistoryConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail/type'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
type Props = {
  maintenanceShiftId: number
  maintenanceScheduleId: number
  isRenderReview?: boolean
  isApproveAll?: boolean
  isViewProp?: boolean
  isUpdateProp?: boolean
  roleId?: number
}
export default function useMaintenanceAssessment(props: Props) {
  const {
    maintenanceShiftId,
    maintenanceScheduleId,
    isRenderReview,
    isApproveAll,
    isViewProp,
    isUpdateProp,
    roleId,
  } = props

  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<MaintenanceHistoryConvert>()
  const { getValues, reset, control, setValue, setError } = methods
  const [isShowDialogError, setIsShowDialogError] = useState(false)
  const [sequenceId, setSequenceId] = useState(0)
  const [isShowDialogListIncident, setIsShowDialogListIncident] =
    useState(false)

  const {
    data: dataAuditFinalSequence,
    isLoading: isLoadingAuditFinalSequence,
    refetch: refetchAuditFinalSequence,
  } = useAuditFinalSequence(
    {
      maintenanceShiftId: maintenanceShiftId,
      maintenanceScheduleId: maintenanceScheduleId,
      isOrigin: isApproveAll,
      roleIdOfConfirm: roleId,
    },
    {
      enabled: isViewProp || isUpdateProp || isRenderReview,
    }
  )

  const { fields: auditFinalSequenceFields } = useFieldArray({
    control,
    name: 'auditFinalSequence',
    keyName: 'key',
  })

  useEffect(() => {
    if (dataAuditFinalSequence) {
      if (isViewProp || isUpdateProp) {
        reset({
          ...getValues(),
          auditFinalSequence: dataAuditFinalSequence?.data,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuditFinalSequence])

  const convertStatusShift = (name: string) => {
    if (name === 'PAUSED') {
      return `${t('self_maintenance.self_maintenance_perform.text.normal')}`
    }
    return 'Hoạt động ổn định'
  }

  return [
    {
      methods,
      isLoadingAuditFinalSequence,
      auditFinalSequenceFields: auditFinalSequenceFields ?? [],
      isShowDialogError,
      sequenceId,
      isShowDialogListIncident,
    },
    {
      t,
      setIsShowDialogError,
      setSequenceId,
      setIsShowDialogListIncident,
      convertStatusShift,
      refetchAuditFinalSequence,
    },
  ] as const
}
