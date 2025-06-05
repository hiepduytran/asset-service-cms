import { getUserIdToken } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  useGetAuditMaintenances,
  useGetInfoUser,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail'
import { AuditMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mergeShifts } from './components/utils'

const useSelfMaintenanceCheckAction = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<AuditMaintenanceConvert>()
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { reset, handleSubmit } = methods

  const [isShowDialogDetailError, setIsShowDialogDetailError] = useState(false)
  const [incidentRecordingId, setIncidentRecordingId] = useState<number>(0)

  const userId = getUserIdToken()

  const {
    data: dataAuditMaintenances,
    isLoading: isLoadingAuditMaintenances,
    refetch: refetchAuditMaintenances,
  } = useGetAuditMaintenances({ maintenanceScheduleId: Number(id) })

  const onSubmit = handleSubmit((data) => {})

  const { data: dataGetInfoUser } = useGetInfoUser({ userId: userId })

  useEffect(() => {
    if (dataAuditMaintenances) {
      reset({
        ...dataAuditMaintenances.data,
        maintenanceShiftAudits: mergeShifts(
          dataAuditMaintenances.data.maintenanceShiftAudits
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuditMaintenances])

  return [
    {
      methods,
      isView,
      isUpdate,
      isLoadingAuditMaintenances,
      isShowDialogDetailError,
      incidentRecordingId,
      dataGetInfoUser,
    },
    {
      t,
      onSubmit,
      refetchAuditMaintenances,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
    },
  ] as const
}

export default useSelfMaintenanceCheckAction
