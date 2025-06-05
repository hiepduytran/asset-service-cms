import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetFirstPeriodDetail } from '@/service/asset/firstPeriod/get'
import { postFirstPeriodSave } from '@/service/asset/firstPeriod/save'
import { getAccessoryByProductId } from '@/service/asset/firstPeriod/save/getAccessoryByProductId'
import { RequestBody } from '@/service/asset/firstPeriod/save/type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  asset: null,
  lastMaintenanceDate: null,
}

export const useFirstPeriodSave = () => {
  const { t } = useTranslation(TRANSLATE.FIRST_PERIOD)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['POST']>({ defaultValues })

  const { control, setValue, handleSubmit, reset, watch } = methodForm

  const { fields } = useFieldArray({
    control,
    name: 'assetFirstPeriodLines',
    keyName: 'key',
  })

  const {
    data: dataDetail,
    isLoading,
    refetch,
  } = useQueryGetFirstPeriodDetail(
    {
      assetFirstPeriod: id,
    },
    { enabled: !!id }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    postFirstPeriodSave,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.FIRST_PERIOD}/[id]`,
          query: {
            id: id ? id : res.data?.data.id,
            actionType: 'VIEW',
          },
        })
        refetch()
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const handleChangeProduct = async () => {
    await getAccessoryByProductId({
      productId: watch('asset')?.product?.id ?? null,
    })
      .then((res) => {
        try {
          const dataAccessoryByProductId = res?.data.content ?? []

          if (!!dataAccessoryByProductId) {
            if (dataAccessoryByProductId?.length > 0) {
              setValue(
                'assetFirstPeriodLines',
                dataAccessoryByProductId?.map((item) => ({
                  id: item?.product?.id,
                  sku: item?.product?.code,
                  name: item?.product?.name,
                  lastMaintenanceDate: null,
                }))
              )
            } else {
              setValue('assetFirstPeriodLines', [])
            }
          } else {
            setValue('assetFirstPeriodLines', [])
          }
        } catch (error) {
          toastError(error)
        }
      })
      .catch(() => setValue('assetFirstPeriodLines', []))
  }

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      ...data,
    })
  })

  useEffect(() => {
    if (!!id && !!dataDetail) {
      const data = dataDetail.data
      reset({
        ...data,
        assetName: data?.asset?.name,
        asset: {
          ...data?.asset,
          code: data?.asset?.sku,
          images: data?.asset.imageUrls,
        },
      })
    }
  }, [id, dataDetail, reset, setValue])

  return [
    {
      fields,
      methodForm,
      isView,
      t,
      router,
      id,
      isUpdate,
      isLoadingDetail: isLoading,
      isLoadingSubmit: isLoadingSubmit,
      dataDetail: dataDetail?.data,
    },
    {
      onSubmit,
      handleChangeProduct,
    },
  ] as const
}
