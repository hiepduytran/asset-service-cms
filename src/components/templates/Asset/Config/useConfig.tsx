import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import {
  postConfig,
  putConfig,
  useQueryGetConfig,
} from '@/service/asset/config'
import { useMutation } from 'react-query'
import { toastError, toastSuccess } from '@/toast'
import { useEffect } from 'react'
import { Config } from '@/service/asset/config/type'

const defaultValues = {
  internalWarehouse: null,
  isApprove: true,
}

export const useConfig = () => {
  const { t } = useTranslation(TRANSLATE.CONFIG)
  const methodForm = useFormCustom<Config>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const { isLoading, data, refetch } = useQueryGetConfig({})

  useEffect(() => {
    if (data?.data) {
      reset(data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data])

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    data?.data ? putConfig : postConfig,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data) {
          refetch()
        }
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  return [
    {
      methodForm,
      isLoading,
      isLoadingSubmit,
    },
    { t, onSubmit },
  ] as const
}
