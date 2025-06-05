import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MENU_URL, TRANSLATE } from '@/routes'
import { deleteSeverityManagement } from '@/service/asset/severityManagement/action'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export default function useDialogSeverityManagement() {
  const { t } = useTranslation(TRANSLATE.SEVERITY_MANAGEMENT)
  const { hideDialog } = useDialog()
  const router = useRouter()
  const { id } = router.query

  const onCancel = () => {
    hideDialog()
  }

  const { mutate, isLoading } = useMutation(deleteSeverityManagement, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      hideDialog()
      router.push({
        pathname: `${MENU_URL.SEVERITY_MANAGEMENT}`,
      })
    },
    onError: (error) => {
      toastError(error)
    },
  })

  const onSubmit = () => {
    mutate({
      id: Number(id),
    })
  }
  return [{ isLoading }, { t, hideDialog, onCancel, onSubmit }] as const
}
