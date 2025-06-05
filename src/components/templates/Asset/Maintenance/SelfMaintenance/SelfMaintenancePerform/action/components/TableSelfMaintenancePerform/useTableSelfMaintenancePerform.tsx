import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TRANSLATE } from '@/routes'
import { putAutoMaintenanceApprove } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/action'
import { AutoMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const useTableSelfMaintenancePerform = ({
  refetchAutoMaintenances,
}: {
  refetchAutoMaintenances: any
}) => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<AutoMaintenanceConvert>()
  const { control, getValues, handleSubmit, setError, setValue } = methods
  const { showDialog } = useDialog()
  const router = useRouter()
  const { id, actionType } = router.query
  const [isShowDialogListIncident, setIsShowDialogListIncident] =
    useState(false)
  const [incidentRecordingId, setIncidentRecordingId] = useState<number>(0)
  const [isShowDialogDetailError, setIsShowDialogDetailError] = useState(false)
  const [isShowTooltip, setIsShowTooltip] = useState<{
    [id: string]: boolean
  }>({
    0: false,
  })

  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const handleMouseEnter = (id: number) => {
    setHoveredCell(id)
  }

  const handleMouseLeave = () => {
    setHoveredCell(null)
  }

  const { fields: maintenanceShiftsFields } = useFieldArray({
    control,
    name: 'maintenanceShifts',
    keyName: 'key',
  })

  const [maintenanceScheduleShiftId, setMaintenanceScheduleShiftId] =
    useState(0)

  const {
    mutate: mutateAutoMaintenanceApprove,
    isLoading: isLoadingAutoMaintenanceApprove,
  } = useMutation(putAutoMaintenanceApprove, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      if ((getValues('maintenanceShiftId') ?? []).length > 0) {
        setValue('maintenanceShiftId', [])
      } else {
        refetchAutoMaintenances()
      }
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })
  const onSubmit = handleSubmit((data) => {
    const { sequences } = data
    if (sequences.length > 0) {
      mutateAutoMaintenanceApprove({
        maintenanceShiftId: getValues('currentShift.id'),
        sequences: sequences,
        isBackUp:
          (getValues('maintenanceShiftId') ?? []).length > 0 ? true : null,
      })
    }
  })

  return [
    {
      methods,
      maintenanceShiftsFields,
      isShowDialogListIncident,
      maintenanceScheduleShiftId,
      isLoadingAutoMaintenanceApprove,
      isShowDialogDetailError,
      incidentRecordingId,
      isShowTooltip,
      hoveredCell,
    },
    {
      t,
      showDialog,
      setIsShowDialogListIncident,
      setMaintenanceScheduleShiftId,
      onSubmit,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsShowTooltip,
      handleMouseEnter,
      handleMouseLeave,
    },
  ] as const
}

export default useTableSelfMaintenancePerform
