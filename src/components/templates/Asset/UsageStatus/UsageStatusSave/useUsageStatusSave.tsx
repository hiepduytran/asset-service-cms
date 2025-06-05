import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryUsageStatusDetail } from '@/service/asset/usageStatus/get'
import {
  postUsageStatus,
  putUsageStatus,
} from '@/service/asset/usageStatus/save'
import { RequestBody } from '@/service/asset/usageStatus/save/type'

import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  isActive: true,
  categoryType: 'USAGE_STATUS',
}

export const useUsageStatusSave = () => {
  const { t } = useTranslation(TRANSLATE.USAGE_STATUS)
  const router = useRouter()
  const usageId = Number(router.query?.id)
  const isUpdate = !!usageId

  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })

  const { handleSubmit, reset, setError, watch } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putUsageStatus : postUsageStatus,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router
            .push({
              pathname: `${MENU_URL.USAGE_STATUS}/[id]`,
              query: {
                id: res.data?.data.id,
                actionType: 'VIEW',
              },
            })
            .then(() => refetch())
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

  const { data, isLoading, refetch } = useQueryUsageStatusDetail(
    { usageId },
    { enabled: !!usageId }
  )

  useEffect(() => {
    if (usageId && data?.data) {
      reset(data.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usageId, data?.data])

  const onCancel = () => {
    router.back()
  }

  return [
    {
      methodForm,
      usageId,
      isLoading,
      isLoadingSubmit,
    },
    { t, onSubmit, onCancel, refetch, watch },
  ] as const
}
