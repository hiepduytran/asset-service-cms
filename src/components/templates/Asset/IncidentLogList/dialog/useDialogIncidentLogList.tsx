import { useDialog } from '@/components/hooks/dialog/useDialog'
import { MENU_URL, TRANSLATE } from '@/routes'
import { deleteIncidentLogList } from '@/service/asset/IncidentLogList/action'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export default function useDialogIncidentLogList() {
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const router = useRouter()
  const { id } = router.query
  const { hideDialog } = useDialog()
  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    deleteIncidentLogList,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.INCIDENT_LOG_LIST}`,
        })
        hideDialog()
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = () => {
    mutate({ id: Number(id) })
  }
  return [{ isLoadingSubmit }, { t, onSubmit, hideDialog }] as const
}
