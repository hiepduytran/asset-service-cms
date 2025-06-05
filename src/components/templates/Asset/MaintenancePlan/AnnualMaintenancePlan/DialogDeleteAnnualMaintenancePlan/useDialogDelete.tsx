import { useDialog } from '@/components/hooks/dialog/useDialog'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'
import { deleteAnnualMaintenancePlan } from '@/service/asset/maintenancePlan/annualMaintenancePlan/delete'

export const useDialogDelete = ({ id, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    id: number
  }>({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteAnnualMaintenancePlan, {
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
