import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryProblemCategoryDetail } from '@/service/asset/problemCategory/get'
import {
  postProblemCategory,
  putProblemCategory,
} from '@/service/asset/problemCategory/save'
import { RequestBody } from '@/service/asset/problemCategory/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  isActive: true,
  categoryType: 'CATEGORY_PROBLEMS',
}

export const useProblemCategorySave = () => {
  const { t } = useTranslation(TRANSLATE.PROBLEM_CATEGORY)
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { handleSubmit, reset, getValues, setError, watch } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putProblemCategory : postProblemCategory,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.PROBLEM_CATEGORY}/[id]`,
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

  const { data, isLoading, refetch } = useQueryProblemCategoryDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      reset(data.data)
    }
  }, [id, data?.data])

  const onCancel = () => {
    router.back()
  }

  return [
    {
      name: getValues('name'),
      methodForm,
      id,
      isLoading,
      isLoadingSubmit,
    },
    { t, onSubmit, onCancel, refetch, watch },
  ] as const
}
