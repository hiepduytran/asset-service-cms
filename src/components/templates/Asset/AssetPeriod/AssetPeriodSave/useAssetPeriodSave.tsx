import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetAssetPeriodDetail } from '@/service/asset/assetPeriod/get'
import {
  postAssetPeriodSave,
  putAssetPeriodSave,
} from '@/service/asset/assetPeriod/save'
import { getAccessoryByProductId } from '@/service/asset/assetPeriod/save/getAccessoryByProductId'
import { RequestBody } from '@/service/asset/assetPeriod/save/type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {}

export const useAssetPeriodSave = () => {
  const { t } = useTranslation(TRANSLATE.ASSET_PERIOD)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const methodForm = useFormCustom<RequestBody['POST']>({ defaultValues })

  const { control, setValue, handleSubmit, watch, reset } = methodForm

  const { fields } = useFieldArray({
    control,
    name: 'assetPeriodLines',
    keyName: 'key',
  })

  const {
    data: dataDetail,
    isLoading,
    refetch,
  } = useQueryGetAssetPeriodDetail(
    {
      assetPeriodId: id,
    },
    { enabled: !!id }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetPeriodSave : postAssetPeriodSave,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.ASSET_PERIOD}/[id]`,
          query: {
            id: id ? id : res?.data?.data?.id,
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

  const onSubmit = handleSubmit(async (data) => {
    mutate({
      ...data,
      id: id ?? null,
    })
  })

  const handleChangeProduct = async () => {
    await getAccessoryByProductId({ productId: watch('product')?.id ?? null })
      .then((res) => {
        try {
          const dataAccessoryByProductId = res?.data.content ?? []

          if (!!dataAccessoryByProductId) {
            if (dataAccessoryByProductId?.length > 0) {
              setValue(
                'assetPeriodLines',
                dataAccessoryByProductId?.map((item, index) => ({
                  assetAccessoryLine: {
                    ...item?.product,
                    id: item?.id,
                  },
                  period: null,
                  periodType: 'MONTH',
                  frequency: null,
                  frequencyType: 'HOUR',
                }))
              )
            } else {
              setValue('assetPeriodLines', [])
            }
          } else {
            setValue('assetPeriodLines', [])
          }
        } catch (error) {
          toastError(error)
        }
      })
      .catch(() => setValue('assetPeriodLines', []))
  }

  // useEffect(() => {
  //     if (!!dataAccessoryByProductId) {
  //         setValue('assetPeriodLines', dataAccessoryByProductId?.data?.accessoryLines?.map((item, index) => ({
  //             assetAccessoryLine: {
  //                 ...item?.product,
  //                 id: item?.id
  //             },
  //         })))
  //     }
  //     else {
  //         setValue('assetPeriodLines', [])
  //     }

  // }, [!!dataAccessoryByProductId]);

  useEffect(() => {
    if (!!id && !!dataDetail) {
      const data = dataDetail.data
      reset({
        ...data,
        assetName: data?.product?.name,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataDetail])

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
