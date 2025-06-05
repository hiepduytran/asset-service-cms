import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getListCodesRecovery } from '@/service/asset/allocation/save/getListAsset'
import { useQueryGetTransferAssetDetail } from '@/service/asset/assetHandover/detail'
import { IncidentDetail } from '@/service/asset/assetHandover/detail/type'
import { postIncidentLog } from '@/service/asset/recovery/save'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useFieldArray } from 'react-hook-form'

export default function useIncidentLog() {
  const { t } = useTranslation(TRANSLATE.ASSET_HANDOVER)
  const router = useRouter()
  const { id } = router.query
  const methods = useFormCustom<IncidentDetail>()

  const { control, reset, setValue, handleSubmit, setError } = methods
  const org = useAppSelector((state) => state.orgData)
  const {
    data: dataGetTransferAssetDetail,
    isLoading: isLoadingGetTransferAssetDetail,
  } = useQueryGetTransferAssetDetail({
    id: Number(id),
  })

  const { fields: fieldsTransferAssetDetail } = useFieldArray({
    control,
    name: 'asset',
    keyName: 'key',
  })

  useEffect(() => {
    if (dataGetTransferAssetDetail) {
      reset({
        code: '',
        recordDate: '',
        recorder: null,
        source: 'TRANSFER',
        collector: dataGetTransferAssetDetail.data.collector,
        sourceCode: dataGetTransferAssetDetail.data.code,
        allocationChooseType:
          dataGetTransferAssetDetail.data.allocationChooseType,
        org: dataGetTransferAssetDetail.data.organization,
        department: dataGetTransferAssetDetail.data.department,
        employee: dataGetTransferAssetDetail.data.employee,
        note: dataGetTransferAssetDetail.data.note,
        asset: dataGetTransferAssetDetail.data.asset.filter(
          (item) => item.recordConditionType === 'BROKEN'
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetTransferAssetDetail])

  useEffect(() => {
    if (org) {
      setValue('org', org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate: mutateIncidentLog, isLoading: isLoadingIncidentLog } =
    useMutation(postIncidentLog, {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.ASSET_HANDOVER}/[id]`,
          query: {
            id: id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    })

  const onSubmit = handleSubmit((data) => {
    mutateIncidentLog(data)
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.identifierCode'),
          fieldName: 'identity',
        },
        {
          header: t('table.assetCode'),
          fieldName: 'assetCode',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('table.recordStatus'),
          fieldName: 'recordConditionType',
        },
        {
          header: t('table.handlingPlan'),
          fieldName: 'handlingPlanType',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableData = fieldsTransferAssetDetail.map((item, index: number) => ({
    identity: (
      <CoreAutoCompleteAPI
        control={control}
        name={`asset.${index}.assetIdentity`}
        label=''
        placeholder={t('placeholder.identifierCode')}
        required
        rules={{ required: t('common:validation.required') }}
        fetchDataFn={getListCodesRecovery}
        labelPath='code'
        valuePath='id'
        isViewProp={true}
      />
    ),
    assetCode: (
      <CoreInput
        control={control}
        name={`asset.${index}.product.code`}
        required
        rules={{ required: t('common:validation.required') }}
        isViewProp={true}
      />
    ),
    assetName: (
      <CoreInput
        control={control}
        name={`asset.${index}.product.name`}
        required
        rules={{ required: t('common:validation.required') }}
        isViewProp={true}
      />
    ),
    recordConditionType: (
      <CoreAutocomplete
        control={control}
        name={`asset.${index}.recordConditionType`}
        placeholder={`${t('placeholder.manager')}`}
        rules={{ required: t('common:validation.required') }}
        required
        options={[
          { label: 'Bình thường', value: 'NORMAL' },
          { label: 'Hỏng', value: 'BROKEN' },
        ]}
        returnValueType='enum'
      />
    ),
    handlingPlanType: (
      <CoreAutocomplete
        control={control}
        name={`asset.${index}.handlingPlanType`}
        placeholder={`${t('placeholder.quantity')}`}
        options={[
          { label: 'Được thu hồi', value: 'QUALIFIED' },
          { label: 'Lập biên bản', value: 'UNQUALIFIED' },
        ]}
        rules={{ required: t('common:validation.required') }}
        required
        returnValueType='enum'
      />
    ),
  }))

  return [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingGetTransferAssetDetail,
      isLoadingIncidentLog,
    },
    { t, onSubmit },
  ] as const
}
