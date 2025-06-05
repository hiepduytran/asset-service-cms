import { useDialog } from '@/components/hooks/dialog/useDialog'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'
import { deleteGroupStandard } from '@/service/asset/standardDeclaration/delete'

export const useDialogDelete = ({ groupStandardId, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.STANDARD_DECLARATION)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    groupStandardId: number
  }>({
    defaultValues: {
      groupStandardId,
    },
  })

  const { mutate, isLoading } = useMutation(deleteGroupStandard, {
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
