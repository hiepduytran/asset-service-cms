import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { putCancelAssetRecovery } from '@/service/asset/recovery/delete'
import { toastError, toastSuccess } from '@/toast'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'

export const useDialogCancelAssetHandover = ({ id, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.RECOVERY)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    id: number
  }>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(putCancelAssetRecovery, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      backFn()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate({
      id: input.id,
      status: 'TERMINATE',
    })
    hideDialog()
  })
  return [{ isLoading }, { t, onSubmit }] as const
}
