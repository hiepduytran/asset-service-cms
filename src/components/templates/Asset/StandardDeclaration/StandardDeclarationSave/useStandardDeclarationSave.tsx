import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/standardDeclaration/save/type'
import {
  postGroupStandard,
  putGroupStandard,
} from '@/service/asset/standardDeclaration/save'
import { useQueryGroupStandardDetail } from '@/service/asset/standardDeclaration/save/getDetail'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  isActive: true,
  createdDate: null,
}

export const useStandardDeclarationSave = () => {
  const { t } = useTranslation(TRANSLATE.STANDARD_DECLARATION)
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
    isUpdate ? putGroupStandard : postGroupStandard,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.STANDARD_DECLARATION}/[id]`,
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

  const { data, isLoading, refetch } = useQueryGroupStandardDetail(
    { groupStandardId: id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        createdDate: data?.data?.standardCreatedAt,
        isActive: data?.data?.status,
      })
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
