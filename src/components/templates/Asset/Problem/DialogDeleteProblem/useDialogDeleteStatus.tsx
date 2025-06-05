import { useDialog } from '@/components/hooks/dialog/useDialog'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useMutation } from 'react-query'
import { Props } from '.'
import { deleteProblem } from '@/service/asset/problem/delete'

export const useDialogDeleteProblem = ({ problemId, backFn }: Props) => {
  const { t } = useTranslation(TRANSLATE.PROBLEM)
  const { hideDialog } = useDialog()
  const { handleSubmit, setError } = useFormCustom<{
    problemId: number
  }>({
    defaultValues: {
      problemId,
    },
  })

  const { mutate, isLoading } = useMutation(deleteProblem, {
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
