import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { postDialogPauseMachine } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/action'
import { DialogPauseMachine } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/action/type'
import { ShutdownInformation } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  startDate: '',
  endDate: '',
  selfMaintenanceType: '',
  incidentRecoding: [],
  reason: '',
}

const useDialogPauseMachine = ({
  refetchAuditMaintenances,
  hideDialogPauseMachine,
  asset,
  maintenanceScheduleShiftId,
  shutdownInformation,
  severityManagement,
  isViewProp,
}: {
  refetchAuditMaintenances?: any
  hideDialogPauseMachine: () => void
  asset: {
    id: number
    code: string
  }
  maintenanceScheduleShiftId: number
  shutdownInformation?: ShutdownInformation
  isViewProp?: boolean
  severityManagement?: {
    id: number
    code: string
    name: string
  }
}) => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<DialogPauseMachine>({
    defaultValues,
  })
  const { hideDialog } = useDialog()
  const router = useRouter()

  const compareHourAndMinute = (time1: string | null, time2: string) => {
    const [hour1, minute1] = (time1 ?? '').split(' ')[1].split(':').map(Number)
    const [hour2, minute2] = time2.split(':').map(Number)

    if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) {
      return 'Không được chọn nhỏ hơn ca hiện tại!'
    }
  }
  const { handleSubmit, setError, reset } = methods

  const { mutate, isLoading } = useMutation(postDialogPauseMachine, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      hideDialogPauseMachine()
      refetchAuditMaintenances()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate({
      ...data,
      selfMaintenanceType: 'SELF_MAINTENANCE',
      asset,
      maintenanceScheduleShiftId,
      severityManagement: severityManagement,
      // finalStatus: 'PAUSED',
    })
  })

  useEffect(() => {
    reset(shutdownInformation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shutdownInformation])

  return [
    { router, methods, isLoading },
    { t, hideDialog, onSubmit, compareHourAndMinute },
  ] as const
}

export default useDialogPauseMachine
