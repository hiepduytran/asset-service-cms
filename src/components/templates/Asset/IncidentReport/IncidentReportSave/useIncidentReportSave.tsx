import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { ColumnProps } from '@/components/organism/CoreTable'
import { IncidentReportSave } from '@/service/asset/incidentReport/save/type'
import { postIncidentReport, putIncidentReport } from '@/service/asset/incidentReport/save'
import { useQueryIncidentReport } from '@/service/asset/incidentReport/save/getDetail'
import { FORMAT_DATE_TIME_API, useDate } from '@/components/hooks/date/useDate'

const defaultValues = {
  asset: null,
  recorder: null,
  department: null,
  incidentRecodingIds: [],
}

export default function useIncidentReportSave() {
  const { t } = useTranslation(TRANSLATE.INCIDENT_REPORT)
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const { getDateNow } = useDate()
  const methodForm = useFormCustom<IncidentReportSave>({
    defaultValues: {
      ...defaultValues,
      recordingTime: getDateNow(FORMAT_DATE_TIME_API),
    },
  })
  const isUpdate = !!id

  const [updatedItemsIncident, setUpdatedItemsIncident] = useState<number[]>([]);
  const [updatedItemsIncidentAddNew, setUpdatedItemsIncidentAddNew] = useState<number[]>([]);
  const [prevData, setPrevData] = useState<any[]>([]);

  const { handleSubmit, setError, reset, watch } = methodForm


  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putIncidentReport : postIncidentReport,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        if (res?.data?.data?.id) {
          router.push({
            pathname: `${MENU_URL.INCIDENT_REPORT}/[id]`,
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
    if (watch('incidentRecodingIds').length > 0) {
      mutate(data)
    } else {
      toastError('Vui lòng khai báo sự cố')
    }
  })

  const { data, isLoading, refetch } = useQueryIncidentReport(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data?.data) {
      reset({
        ...data.data,
        assetName: data.data.asset?.name,
        product: {
          ...data.data.product,
          sku: data.data.product?.code,
        },
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
          header: t('table.assetCode'),
          fieldName: 'sku',
        },
        {
          header: t('table.assetName'),
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
      updatedItemsIncident,
      updatedItemsIncidentAddNew,
      prevData
    },
    { t, onSubmit, onCancel, setUpdatedItemsIncident, setUpdatedItemsIncidentAddNew, setPrevData },
  ] as const
}
