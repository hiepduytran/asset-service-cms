import { useDialog } from '@/components/hooks/dialog/useDialog'
import { getUserIdToken } from '@/config/token'
import { MENU_URL, TRANSLATE } from '@/routes'
import { incidentApprove } from '@/service/asset/IncidentApprove/action'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import DialogReviewAgain from '../DialogReviewAgain'
type Props = {
  hideDialogDeleteIncident: () => void
  refetchDetailIncidentApprove: any
}
const useDialogDeleteIncident = (props: Props) => {
  const { hideDialogDeleteIncident, refetchDetailIncidentApprove } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_APPROVE)
  const { hideDialog } = useDialog()
  const methods = useFormContext()
  const { setError, getValues, handleSubmit } = methods
  const router = useRouter()
  const { id } = router.query
  const { showDialog } = useDialog()

  const userId = getUserIdToken()

  const { mutate: mutateRejectAndReview, isLoading: isLoadingRejectAndReview } =
    useMutation(incidentApprove, {
      onSuccess: () => {
        toastSuccess(t('common:message.success'))
        hideDialogDeleteIncident()
        showDialog(
          <DialogReviewAgain
            prop={{
              data: getValues(`incidentRecordingMaintenances.0`),
              length: getValues(`incidentRecordingMaintenances`).length,
              refetchDetailIncidentApprove: refetchDetailIncidentApprove,
              productId: getValues('asset.id'),
            }}
          />
        )
      },
      onError: (error) => {
        toastError(error, setError)
      },
    })
  const { mutate: mutateReject, isLoading: isLoadingReject } = useMutation(
    incidentApprove,
    {
      onSuccess: () => {
        toastSuccess(t('common:message.success'))
        router.push(MENU_URL.INCIDENT_APPROVE)
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onConfirm = handleSubmit(() => {
    mutateReject({
      id: Number(id),
      status: 'REJECTED',
      reason: getValues('reason'),
      personApprove: {
        id: userId,
        name: '',
        code: '',
      },
    })
  })
  const onConfirmAndReview = handleSubmit(() => {
    mutateRejectAndReview({
      id: Number(id),
      status: 'REJECTED',
      reason: getValues('reason'),
      personApprove: {
        id: userId,
        name: '',
        code: '',
      },
    })
  })
  return [
    { methods, isLoadingReject, isLoadingRejectAndReview },
    { t, hideDialog, onConfirmAndReview, onConfirm },
  ] as const
}

export default useDialogDeleteIncident
