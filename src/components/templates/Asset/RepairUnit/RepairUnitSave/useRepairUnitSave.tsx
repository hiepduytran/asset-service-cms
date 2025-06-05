import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryRepairUnitDetail } from '@/service/asset/repairUnit/getDetail'
import { postRepairUnitAvailable, postRepairUnitNew, putRepairUnitAvailable } from '@/service/asset/repairUnit/save'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  partner: {
    vendorActivated: true
  },
  assetMap: [
    {
      product: null,
      assetAccessory: null
    }
  ]
}

export const useRepairUnitSave = () => {

  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const router = useRouter()
  const { id, actionType, type } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!Number(id)
  const methodForm = useFormCustom<any>({ defaultValues })
  const { handleSubmit, setError, reset, watch, control } = methodForm

  const {
    fields,
    remove,
    append,
  } = useFieldArray({
    control: control,
    name: 'assetMap',
    keyName: 'key',
  })

  const { data, isLoading, refetch } = useQueryRepairUnitDetail(
    { id: id },
    { enabled: !!id }
  )

  const { data: vendorData, isLoading: vendorLoading } = useQueryRepairUnitDetail(
    { id: watch('partnerId')?.id },
    { enabled: !!(watch('partnerId')?.id) }
  )

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putRepairUnitAvailable : type === 'NEW' ? postRepairUnitNew : postRepairUnitAvailable,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.REPAIR_UNIT}/[id]`,
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

  const onCancel = () => {
    router.back()
  }

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data?.data,
        partnerId: {
          id: data?.data?.partner?.id,
          code: data?.data?.partner?.code,
          name: data?.data?.partner?.name
        },
        partner: {
          ...data?.data?.partner,
          type: data?.data?.partner?.isCompany ? 'ORGANIZATION' : 'INDIVIDUAL',
        },
        assetMap: data?.data?.assetMap?.map((item: any) => ({
          ...item,
          assetAccessory: item?.assetAccessory?.map((accessory: any) => ({
            ...accessory,
            product: accessory,
          })),
        })),
      })
    }
    if (watch('partnerId')?.id && vendorData?.data && !id) {
      reset({
        ...watch(),
        partner: {
          ...vendorData?.data?.partner,
          type: vendorData?.data?.partner?.isCompany ? 'ORGANIZATION' : 'INDIVIDUAL',
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data, id, vendorData?.data, watch('partnerId')?.id])

  return [
    {
      methodForm,
      id,
      isView,
      isUpdate,
      isLoadingSubmit,
      isLoading,
      vendorLoading,
      router,
      type,
      fields
    },
    { t, onSubmit, onCancel, append, remove },
  ] as const
}
