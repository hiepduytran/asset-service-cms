import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetAutoMaintenanceDetailError } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail'
import { IncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog/type'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  hideDialog: () => void
  incidentRecordingId: number
}
export default function useDialogDetailError(props: Props) {
  const { hideDialog, incidentRecordingId } = props
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<IncidentRecordingMaintenanceAuto>()
  const { reset } = methods

  const {
    data: dataAutoMaintenanceDetailError,
    isLoading: isLoadingAutoMaintenanceDetailError,
  } = useGetAutoMaintenanceDetailError({
    id: incidentRecordingId,
  })

  useEffect(() => {
    if (dataAutoMaintenanceDetailError) {
      reset(dataAutoMaintenanceDetailError.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAutoMaintenanceDetailError])

  return [
    {
      methods,
      isLoadingAutoMaintenanceDetailError,
    },
    {
      t,
    },
  ] as const
}
