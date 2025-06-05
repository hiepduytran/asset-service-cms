import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/CoreTable'
import { findFirstError } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { useAppSelector } from '@/redux/hook'
import { MENU_URL, TRANSLATE } from '@/routes'
import { getListCodesRecovery } from '@/service/asset/allocation/save/getListAsset'
import { useQueryAssetRecoveryDetail } from '@/service/asset/recovery/detail'
import { AssetRecoveryDetail } from '@/service/asset/recovery/detail/type'
import { useQueryGetStockPickingWarehouseReceipt } from '@/service/asset/recovery/getList'
import {
  postAssetRecovery,
  putAssetRecovery,
} from '@/service/asset/recovery/save'
import { toastError, toastSuccess } from '@/toast'
import { Box, IconButton, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  recallDate: '',
  collector: null,
  allocationChooseType: 'ORGANIZATION',
  reasonRecall: null,
  feature: null,
  reference: null,
  note: '',
  asset: [
    {
      assetIdentity: null,
      product: null,
      recordConditionType: null,
      handlingPlanType: null,
    },
  ],
}

export default function useRecoverySave() {
  const { t } = useTranslation(TRANSLATE.RECOVERY)
  const router = useRouter()
  const id = Number(router.query?.id)
  const { actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const methods = useFormCustom<AssetRecoveryDetail>({
    defaultValues,
  })
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
    setFocus,
    getValues,
  } = methods
  const org = useAppSelector((state) => state.orgData)
  const { showDialog } = useDialog()

  const [isShowDialogRecovery, setIsShowDialogRecovery] = useState<{
    isShow: boolean
    type?: string
  }>({
    isShow: false,
  })
  const [dataFeatureList, setDataFeatureList] = useState<any>([])

  const {
    data: dataAssetRecoveryDetail,
    isLoading: isLoadingAssetRecoveryDetail,
  } = useQueryAssetRecoveryDetail({ id }, { enabled: isUpdate })

  const {
    data: dataStockPickingWarehouseReceipt,
    isLoading: isLoadingStockPickingWarehouseReceipt,
  } = useQueryGetStockPickingWarehouseReceipt(
    { orderId: id },
    { enabled: !!id }
  )


  const {
    fields: productFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'asset',
    keyName: 'key',
  })
  useEffect(() => {
    if (dataAssetRecoveryDetail) {
      reset(dataAssetRecoveryDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAssetRecoveryDetail])

  useEffect(() => {
    if (org) {
      setValue('organization', org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const { data: dataFeatureList, isLoading: isLoadingFeatureList } =
  //   useQueryFeatureList(
  //     { id: watch('reasonRecall.id') },
  //     {
  //       enabled: !!watch('reasonRecall.id'),
  //     }
  //   )

  const { isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAssetRecovery : postAssetRecovery,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.RECOVERY}/[id]`,
          query: {
            id: res.data.id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        toastError(error)
      },
    }
  )

  const onSubmit = handleSubmit(() => {
    setIsShowDialogRecovery({
      isShow: true,
      type: 'SUBMIT',
    })
  })

  const onSaveChange = async () => {
    await trigger()
    if (errors && Object.keys(errors).length > 0) {
      const firstErrorKey = findFirstError(errors)
      if (firstErrorKey) {
        setFocus(firstErrorKey)
      }
      return
    }
    setIsShowDialogRecovery({
      isShow: true,
      type: 'SAVE_CHANGE',
    })
  }

  const onRecoverForm = async () => {
    await trigger()
    if (errors && Object.keys(errors).length > 0) {
      const firstErrorKey = findFirstError(errors)
      if (firstErrorKey) {
        setFocus(firstErrorKey)
      }
      return
    }
    setIsShowDialogRecovery({
      isShow: true,
      type: 'RECOVER_FORM',
    })
  }

  const hideDialog = () => {
    setIsShowDialogRecovery({
      isShow: false,
    })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.identifierCode'),
          fieldName: 'identity',
          styleCell: {
            style: {
              width: '300px',
            },
          },
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
        ...(isView
          ? []
          : [
            {
              header: '',
              fieldName: 'deleteProduct',
              styleCell: {
                style: {
                  minWidth: '80px',
                },
              },
            },
          ]),
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

  const isInvalidAllocation = () => {
    const allocationType = watch('allocationChooseType')
    if (allocationType === 'ORGANIZATION') return false
    if (allocationType === 'DEPARTMENT') return !watch('department')
    return !watch('employee')
  }

  const tableData = productFields.map((field, index: number) => {
    return {
      identity: (
        <SelectBoxCustom
          key={field.key}
          control={control}
          name={`asset.${index}.assetIdentity`}
          label=''
          placeholder={`${t('placeholder.identifierCode')}`}
          columns={[
            {
              header: t('table.identifierCode'),
              fieldName: 'code',
            },
            {
              header: t('table.assetCode'),
              fieldName: 'asset.code',
            },
            {
              header: t('table.assetName'),
              fieldName: 'asset.name',
            },
          ]}
          fetchDataFn={getListCodesRecovery}
          params={{
            allocationChooseType: getValues('allocationChooseType'),
            orgId: getValues('organization.id'),
            departmentId: getValues('department.id'),
            employeeId: getValues('employee.id'),
            removeIds: productFields.map(
              (item, i) => watch(`asset.${i}.assetIdentity`)?.id
            ),
          }
          }
          labelPath='code'
          valuePath='id'
          onChangeValue={(value) => {
            if (value) {
              setValue(`asset.${index}.assetIdentity`, {
                id: value.id,
                code: value.code,
              })
              setValue(`asset.${index}.product`, {
                id: value.asset.id,
                code: value.asset.code,
                name: value.asset.name,
              })
            } else {
              setValue(`asset.${index}.assetIdentity`, null)
              setValue(`asset.${index}.product`, null)
            }
          }}
          disabled={isInvalidAllocation()}
          trigger={trigger}
        />
      ),
      assetCode: (
        <Typography>{getValues(`asset.${index}.product.code`)}</Typography>
      ),
      assetName: (
        <Typography>{getValues(`asset.${index}.product.name`)}</Typography>
      ),
      recordConditionType: (
        <CoreAutocomplete
          key={field.key}
          control={control}
          name={`asset.${index}.recordConditionType`}
          placeholder={`${t('placeholder.recordConditionType')}`}
          rules={{ required: t('common:validation.required') }}
          required
          options={[
            {
              label: `${t('text.NORMAL')}`,
              value: 'NORMAL',
            },
            {
              label: `${t('text.BROKEN')}`,
              value: 'BROKEN',
            },
          ]}
          returnValueType='enum'
        />
      ),
      handlingPlanType: (
        <CoreAutocomplete
          key={field.key}
          control={control}
          name={`asset.${index}.handlingPlanType`}
          placeholder={`${t('placeholder.quantity')}`}
          options={[
            {
              label: `${t('text.QUALIFIED')}`,
              value: 'QUALIFIED',
            },
            {
              label: `${t('text.UNQUALIFIED')}`,
              value: 'UNQUALIFIED',
            },
          ]}
          rules={{ required: t('common:validation.required') }}
          required
          returnValueType='enum'
        />
      ),
      deleteProduct: !isView && (
        <Box sx={{ textAlign: 'center' }}>
          <IconButton
            onClick={() => {
              remove(index)
            }}
          >
            <Image
              src={require('@/assets/svg/action/delete.svg')}
              alt='delete'
              width={16}
              height={16}
            />
          </IconButton>
        </Box>
      ),
    }
  })

  return [
    {
      id,
      router,
      methods,
      isView,
      isUpdate,
      isLoadingAssetRecoveryDetail,
      isLoadingSubmit,
      columns,
      tableData,
      isShowDialogRecovery,
      // dataFeatureList: dataFeatureList ? dataFeatureList.data : [],
      isLoadingFeatureList: false,
      dataFeatureList,
      dataStockPickingWarehouseReceipt: dataStockPickingWarehouseReceipt?.data,
      isLoadingStockPickingWarehouseReceipt,
    },
    {
      t,
      onSubmit,
      append,
      onSaveChange,
      onRecoverForm,
      setIsShowDialogRecovery,
      hideDialog,
      setDataFeatureList,
      showDialog,
    },
  ] as const
}
