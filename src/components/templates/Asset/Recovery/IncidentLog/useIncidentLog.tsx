import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreAutoCompleteAPI from '@/components/atoms/CoreAutoCompleteAPI'
import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getListCodesRecovery } from '@/service/asset/allocation/save/getListAsset'
import { useQueryAssetRecoveryDetail } from '@/service/asset/recovery/detail'
import { IncidentDetail } from '@/service/asset/recovery/detail/type'
import { postIncidentLog } from '@/service/asset/recovery/save'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useFieldArray } from 'react-hook-form'

export default function useIncidentLog() {
  const { t } = useTranslation(TRANSLATE.RECOVERY)
  const router = useRouter()
  const { id } = router.query
  const methods = useFormCustom<IncidentDetail>()

  const { control, reset, setValue, handleSubmit, setError } = methods
  const org = useAppSelector((state) => state.orgData)
  const {
    data: dataAssetRecoveryDetail,
    isLoading: isLoadingAssetRecoveryDetail,
  } = useQueryAssetRecoveryDetail({ id: Number(id) })

  const { fields: fieldsAssetRecoveryDetail } = useFieldArray({
    control,
    keyName: 'key',
    name: 'asset',
  })

  useEffect(() => {
    if (dataAssetRecoveryDetail) {
      reset({
        code: '',
        recordDate: '',
        recorder: null,
        collector: dataAssetRecoveryDetail.data.collector,
        source: 'RECOVER',
        sourceCode: dataAssetRecoveryDetail.data.code,
        allocationChooseType: dataAssetRecoveryDetail.data.allocationChooseType,
        org: dataAssetRecoveryDetail.data.organization,
        department: dataAssetRecoveryDetail.data.department,
        employee: dataAssetRecoveryDetail.data.employee,
        note: dataAssetRecoveryDetail.data.note,
        asset: dataAssetRecoveryDetail.data.asset.filter(
          (item) => item.recordConditionType === 'BROKEN'
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAssetRecoveryDetail])

  useEffect(() => {
    if (org) {
      setValue('org', org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { mutate: mutateIncidentLog, isLoading: isLoadingIncidentLog } =
    useMutation(postIncidentLog, {
      onSuccess: () => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.RECOVERY}/[id]`,
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
          header: t('table.recordConditionType'),
          fieldName: 'recordConditionType',
        },
        {
          header: t('table.handlingPlanType'),
          fieldName: 'handlingPlanType',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const tableData = fieldsAssetRecoveryDetail.map((item, index: number) => ({
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
          { label: `${t('text.NORMAL')}`, value: 'NORMAL' },
          { label: `${t('text.BROKEN')}`, value: 'BROKEN' },
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
          { label: `${t('text.QUALIFIED')}`, value: 'QUALIFIED' },
          { label: `${t('text.UNQUALIFIED')}`, value: 'UNQUALIFIED' },
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
      isLoadingAssetRecoveryDetail,
      isLoadingIncidentLog,
    },
    { t, onSubmit },
  ] as const
}
