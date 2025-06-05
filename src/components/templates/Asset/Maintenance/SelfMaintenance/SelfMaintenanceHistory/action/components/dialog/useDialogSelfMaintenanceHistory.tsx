import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetAutoMaintenanceHistoryErrorDetail } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail'
import { AutoMaintenanceError } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/action/type'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  shiftSequenceId: number
  sequence: number
}
export default function useDialogSelfMaintenanceHistory(props: Props) {
  const { shiftSequenceId, sequence } = props
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<AutoMaintenanceError>()
  const { reset } = methods
  const { showDialog, hideDialog } = useDialog()

  const {
    data: dataAutoMaintenanceHistoryErrorDetail,
    isLoading: isLoadingAutoMaintenanceHistoryErrorDetail,
  } = useGetAutoMaintenanceHistoryErrorDetail({
    shiftSequenceId: shiftSequenceId,
  })

  useEffect(() => {
    if (dataAutoMaintenanceHistoryErrorDetail) {
      reset(dataAutoMaintenanceHistoryErrorDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAutoMaintenanceHistoryErrorDetail])
  return [
    { methods, isLoadingAutoMaintenanceHistoryErrorDetail },
    {
      t,
      hideDialog,
      showDialog,
    },
  ] as const
}
