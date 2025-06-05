import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetMaintenanceAccessoryDetail } from '@/service/asset/maintenanceAccessory/get'
import {
  postMaintenanceAccessorySave,
  putMaintenanceAccessorySave,
} from '@/service/asset/maintenanceAccessory/save'
import { getAccessoryByProductId } from '@/service/asset/maintenanceAccessory/save/getAccessoryByProductId'
import { RequestBody } from '@/service/asset/maintenanceAccessory/save/type'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {}

export const useMaintenanceAccessorySave = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE_ACCESSORY)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const isCreate = router.asPath.includes('/addNew')

  const methodForm = useFormCustom<RequestBody['POST']>({ defaultValues })

  const { control, setValue, handleSubmit, reset, watch } = methodForm

  const { fields: maintenanceItemFields } = useFieldArray({
    control,
    name: 'maintenanceItems',
    keyName: 'key',
  })

  const {
    data: dataDetail,
    isLoading,
    refetch,
  } = useQueryGetMaintenanceAccessoryDetail(
    {
      maintenanceAccessoryId: id,
    },
    { enabled: !!id }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putMaintenanceAccessorySave : postMaintenanceAccessorySave,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.MAINTENANCE_ACCESSORY}/[id]`,
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
          const dataAccessoryByProductId = res?.data?.content ?? []

          if (!!dataAccessoryByProductId) {
            if (dataAccessoryByProductId?.length > 0) {
              setValue(
                'maintenanceItems',
                dataAccessoryByProductId?.map((item, index) => ({
                  accessory: {
                    ...item?.product,
                    id: item?.id,
                  },
                  maintenanceAccessoryChilds: [],
                }))
              )
            } else {
              setValue('maintenanceItems', [])
            }
          } else {
            setValue('maintenanceItems', [])
          }
        } catch (error) {
          toastError(error)
        }
      })
      .catch(() => setValue('maintenanceItems', []))
  }

  useEffect(() => {
    if (!!id && !!dataDetail) {
      const data = dataDetail.data

      const filteredData = data.maintenanceItems.filter(
        (item) => item?.maintenanceAccessoryChilds?.length > 0
      )

      const convertMaitenance = isView
        ? filteredData
        : data?.maintenanceItems?.map((item) => ({
            accessory: item?.accessory,
            maintenanceAccessoryChilds: item?.maintenanceAccessoryChilds ?? [],
          }))

      reset({
        ...data,
        assetName: data?.product?.name,
        maintenanceItems: convertMaitenance,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dataDetail, t, isView])

  return [
    {
      maintenanceItemFields,
      methodForm,
      isView,
      router,
      id,
      isUpdate,
      isCreate,
      isLoadingDetail: isLoading,
      isLoadingSubmit: isLoadingSubmit,
      dataDetail: dataDetail,
    },
    { t, onSubmit, handleChangeProduct },
  ] as const
}
