import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getUserIdToken } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { putDialogIncident } from '@/service/asset/IncidentLogList/dialog'
import { IncidentRecordingMaintenance } from '@/service/asset/IncidentLogList/dialog/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
type Props = {
  data: any
  length: number
  refetchDetailIncidentApprove: any
}
const useDialogReviewAgain = (props: Props) => {
  const { data, length, refetchDetailIncidentApprove } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_APPROVE)
  const { hideDialog } = useDialog()
  const methods = useFormCustom<IncidentRecordingMaintenance>()
  const { reset, handleSubmit, setError } = methods
  const router = useRouter()

  const userId = getUserIdToken()

  const { mutate, isLoading } = useMutation(putDialogIncident, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      hideDialog()
      refetchDetailIncidentApprove()
      router.push(MENU_URL.INCIDENT_APPROVE)
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const onSubmit = handleSubmit((dataForm) => {
    mutate({
      ...data,
      ...dataForm,
      recorder: {
        id: userId,
        code: '',
        name: '',
      },
      selfMaintenanceType: 'RECOVERY',
      recordingStatus: 'REVIEW_AGAIN',
      actionType: 'REVIEW_EDIT',
      numberOfReviewType: `Review_${length + 1}`,
    })
  })

  useEffect(() => {
    reset(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [
    { methods, isLoading },
    { t, hideDialog, onSubmit },
  ] as const
}

export default useDialogReviewAgain
