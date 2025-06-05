import { useDialog } from '@/components/hooks/dialog/useDialog'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'
import { deleteAssetAccessory } from '@/service/asset/declarationSpareParts/delete'

export const useDialogDelete = ({ assetAccessoryId, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.PROBLEM)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    assetAccessoryId: number
  }>({
    defaultValues: {
      assetAccessoryId,
    },
  })

  const { mutate, isLoading } = useMutation(deleteAssetAccessory, {
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
  return [{ isLoading: false }, { t, onSubmit }] as const
}
