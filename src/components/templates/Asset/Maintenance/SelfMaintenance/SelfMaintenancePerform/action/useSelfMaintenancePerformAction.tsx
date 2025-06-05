import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetAutoMaintenances } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail'
import { AutoMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail/type'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mergeShifts } from './components/utils'

const useSelfMaintenancePerformAction = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const router = useRouter()
  const { id, actionType } = router.query
  const isUpdate = !!id
  const isView = actionType === 'VIEW'
  const methods = useFormCustom<AutoMaintenanceConvert>()
  const { reset, getValues, setValue, watch } = methods

  const [isShowChangeShift, setIsShowChangeShift] = useState(false)
  const [isShowDialogDetailError, setIsShowDialogDetailError] = useState(false)
  const [incidentRecordingId, setIncidentRecordingId] = useState<number>(0)

  const [stateAutoMaintenances, setStateAutoMaintenances] = useState<any>()

  const {
    data: dataAutoMaintenances,
    isLoading: isLoadingAutoMaintenances,
    refetch: refetchAutoMaintenances,
    error: errorAutoMaintenances,
  } = useGetAutoMaintenances({
    maintenanceScheduleId: Number(id),
    maintenanceShiftIds: watch('maintenanceShiftId'),
  })

  useEffect(() => {
    if (dataAutoMaintenances) {
      reset({
        ...dataAutoMaintenances?.data,
        maintenanceShifts: mergeShifts(
          dataAutoMaintenances?.data.maintenanceShifts
        ),
        maintenanceShiftId: getValues('maintenanceShiftId'),
        sequences: [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAutoMaintenances])

  const onChangeShift = () => {
    setIsShowChangeShift(true)
  }

  const hideDialogChangeShift = () => {
    setIsShowChangeShift(false)
  }

  return [
    {
      methods,
      isView,
      isUpdate,
      isLoadingAutoMaintenances,
      isShowChangeShift,
      isShowDialogDetailError,
      incidentRecordingId,
      errorAutoMaintenances,
    },
    {
      t,
      refetchAutoMaintenances,
      onChangeShift,
      hideDialogChangeShift,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
    },
  ] as const
}

export default useSelfMaintenancePerformAction
