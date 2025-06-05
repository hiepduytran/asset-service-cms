import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryOperateDetail } from '@/service/asset/operate/getDetail'
import { postOperate, putOperate } from '@/service/asset/operate/save'
import { RequestBody } from '@/service/asset/operate/save/type'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { getUserIdToken } from '@/config/token'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useQueryStaffWorkingShift } from '@/service/hrm/getStaffWorkingShift'
import { useAppSelector } from '@/redux/hook'

const defaultValues = {
  operateLine: [],
  incidentRecodingIds: [],
  shutdownInformationIds: [],
}

export default function useOperateSave() {
  const { t } = useTranslation(TRANSLATE.OPERATE)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const methodForm = useFormCustom<RequestBody['SAVE']>({
    defaultValues,
  })
  const isUpdate = !!id
  const userId = getUserIdToken()
  const {
    firstName,
    lastName,
  } = useAppSelector((state) => state.companyConfigData)

  const [updatedItemsMS, setUpdatedItemsMS] = useState<number[]>([]);
  const [updatedItemsIncident, setUpdatedItemsIncident] = useState<number[]>([]);
  const [updatedItemsIncidentAddNew, setUpdatedItemsIncidentAddNew] = useState<number[]>([]);
  const [prevData, setPrevData] = useState<any[]>([]);

  const { handleSubmit, setError, reset, setValue } = methodForm

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putOperate : postOperate,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.OPERATE}/[id]`,
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

  const { data, isLoading, refetch } = useQueryOperateDetail(
    { id },
    { enabled: !!id }
  )

  const { data: shiftData, isLoading: isLoadingShift } = useQueryStaffWorkingShift(
    {},
    { enabled: (userId !== 1 && !id) }
  )

  useEffect(() => {
    if (!id && shiftData?.data) {
      setValue('shift', shiftData?.data)
      setValue('user', {
        id: userId,
        name: `${firstName} ${lastName}`,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, id, lastName, shiftData, userId])

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data.data,
        assetName: data.data.asset?.name,
        product: {
          ...data.data.product,
          sku: data.data.product?.code,
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data?.data])

  const onCancel = () => {
    router.back()
  }

  const assetColumns = useMemo(
    () =>
      [
        {
          header: t('operate_save.label.sku'),
          fieldName: 'sku',
        },
        {
          header: t('operate_save.label.name'),
          fieldName: 'name',
        },
      ] as ColumnProps[],
    [t]
  )

  return [
    {
      id,
      methodForm,
      isView,
      isLoadingSubmit,
      isUpdate,
      isLoading,
      assetColumns,
      userId,
      isLoadingShift,
      updatedItemsMS,
      updatedItemsIncident,
      updatedItemsIncidentAddNew,
      prevData
    },
    { t, onSubmit, onCancel, setUpdatedItemsMS, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew, setPrevData },
  ] as const
}
