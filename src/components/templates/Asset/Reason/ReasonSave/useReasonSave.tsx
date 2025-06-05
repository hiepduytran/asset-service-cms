import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useFieldArray } from 'react-hook-form'
import { postReason, putReason } from '@/service/asset/reason/save'
import { useQueryReasonDetail } from '@/service/asset/reason/save/getDetail'
import { ReasonSave } from '@/service/asset/reason/save/type'

const defaultValues = {
  code: '',
  name: '',
  isForeign: false,
  isActive: true,
  reasonLine: [
    {
      system: null,
      features: [],
    },
  ],
}

export const useReasonSave = () => {
  const { t } = useTranslation(TRANSLATE.REASON)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methodForm = useFormCustom<ReasonSave>({
    defaultValues,
  })
  const { handleSubmit, reset, setError, control } = methodForm

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'reasonLine',
    keyName: 'key',
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putReason : postReason,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.REASON}/[id]`,
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

  const { data, isLoading, refetch } = useQueryReasonDetail(
    { id: id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        reasonLine:
          data?.data?.reasonLine?.length === 0
            ? [
                {
                  system: null,
                  features: [],
                },
              ]
            : data?.data?.reasonLine,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  const onCancel = () => {
    router.back()
  }

  return [
    {
      id,
      isView,
      isUpdate,
      methodForm,
      isLoading,
      isLoadingSubmit,
      fields,
    },
    { t, onSubmit, onCancel, refetch, append, remove },
  ] as const
}
