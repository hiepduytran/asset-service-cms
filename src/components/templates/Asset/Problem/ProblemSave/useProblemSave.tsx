import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryProblemDetail } from '@/service/asset/problem/get'
import { postProblem, putProblem } from '@/service/asset/problem/save'
import { RequestBody } from '@/service/asset/problem/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  isActive: true,
  categoryType: 'PROBLEM',
  categoryParam: null,
}

export const useProblemSave = () => {
  const { t } = useTranslation(TRANSLATE.PROBLEM)
  const router = useRouter()
  const problemId = Number(router.query?.id)
  const isUpdate = !!problemId

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })
  const { handleSubmit, reset, getValues, setError, watch } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putProblem : postProblem,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.PROBLEM}/[id]`,
            query: {
              id: res.data?.data.id,
              actionType: 'VIEW',
            },
          })
          refetch()
        }
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const { data, isLoading, refetch } = useQueryProblemDetail(
    { problemId },
    { enabled: !!problemId }
  )

  useEffect(() => {
    if (problemId && data?.data) {
      reset(data.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, data?.data])

  const onCancel = () => {
    router.back()
  }

  return [
    {
      name: getValues('name'),
      methodForm,
      problemId,
      isLoading,
      isLoadingSubmit,
    },
    { t, onSubmit, onCancel, refetch, watch },
  ] as const
}
