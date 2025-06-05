import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postMethodDeclaration,
  putMethodDeclaration,
} from '@/service/asset/methodDeclaration/save'
import { RequestBody } from '@/service/asset/methodDeclaration/save/type'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useQueryMethodDeclarationDetail } from '@/service/asset/methodDeclaration/save/getDetail'

const defaultValues = {
  code: '',
  name: '',
  groupStandard: null,
  product: null,
  isActive: true,
}

export const useMethodDeclarationSave = () => {
  const { t } = useTranslation(TRANSLATE.METHOD_DECLARATION)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { handleSubmit, reset, setError, watch } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putMethodDeclaration : postMethodDeclaration,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.METHOD_DECLARATION}/[id]`,
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

  const { data, isLoading, refetch } = useQueryMethodDeclarationDetail(
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
      isView,
      isUpdate,
      methodForm,
      id,
      isLoading,
      isLoadingSubmit,
    },
    { t, onSubmit, onCancel, refetch, watch },
  ] as const
}
