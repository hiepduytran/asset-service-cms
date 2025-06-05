import { useDialog } from '@/components/hooks/dialog/useDialog'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'
import { deleteReason } from '@/service/asset/reason/delete'

export const useDialogDelete = ({ id, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.REASON)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    id: number
  }>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteReason, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      backFn()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
    hideDialog()
  })
  return [{ isLoading }, { t, onSubmit }] as const
}
