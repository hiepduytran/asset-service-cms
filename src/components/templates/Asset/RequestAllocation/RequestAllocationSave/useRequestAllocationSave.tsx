import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError, toastSuccess } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useQueryGetRequestAllocationDetail } from '@/service/asset/requestAllocation/get'
import { changeStatusApprove } from '@/service/asset/requestAllocation/get/changeStatus'
import {
  getAssetCode,
  postRequestAllocationSave,
  putRequestAllocationSave,
} from '@/service/asset/requestAllocation/save'
import { RequestBody } from '@/service/asset/requestAllocation/save/type'
import { IconButton, InputAdornment, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { useAppSelector } from '@/redux/hook'
import { getStockPickingReceiptProductId } from '@/service/internal-warehouse/stockPicking/list'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'

const defaultValues = {
  code: '',
  requestDate: '',
  updateDate: '',
  planType: '',
  plan: 0,
  allocationChooseType: 'ORGANIZATION',
  note: '',
  asset: [
    {
      asset: null,
      quantity: null,
      uom: null,
      requestQuantity: null,
    },
  ],
}

export const useRequestAllocationSave = () => {
  const { t } = useTranslation(TRANSLATE.REQUEST_ALLOCATION)
  const methods = useFormCustom<RequestBody['POST']>({ defaultValues })

  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
  const isView = actionType === 'VIEW'
  const isCopy = actionType === 'COPY'

  const org = useAppSelector((state) => state.orgData)

  const isCreate = router.asPath.includes('/addNew')
  const isUpdate = !!id

  const {
    handleSubmit,
    setError,
    reset,
    setValue,
    control,
    watch,
    clearErrors,
    trigger,
  } = methods

  const {
    fields: allocationLineFields,
    remove,
    append: appendAllocationLineField,
  } = useFieldArray({
    control: control,
    name: `asset`,
    keyName: 'key',
  })

  const columns = useMemo(
    () => [
      {
        header: t('assetTableDetail.assetCode'),
        fieldName: 'asset',
        styleCell: {
          style: {
            width: '300px',
          },
        },
      },
      {
        header: t('assetTableDetail.assetName'),
        fieldName: 'assetName',
      },
      {
        header: t('assetTableDetail.assetQuantity'),
        fieldName: 'quantity',
      },
      {
        header: t('assetTableDetail.requestQuantity'),
        fieldName: 'requestQuantity',
        styleCell: {
          width: '60px',
        },
      },
      ...(isView
        ? []
        : [
            {
              header: '',
              fieldName: 'deleteRow',
              styleCell: {
                style: {
                  minWidth: '80px',
                },
              },
            },
          ]),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  ) as ColumnProps[]

  const isInvalidAllocation = () => {
    const allocationType = watch('allocationChooseType')
    if (allocationType === 'ORGANIZATION') return false
    if (allocationType === 'DEPARTMENT') return !watch('department')
    return !watch('employee')
  }

  const dataTable = allocationLineFields.map((item, index) => {
    return {
      asset: (
        <SelectBoxCustom
          key={item.key}
          control={control}
          label=''
          valuePath='id'
          labelPath='code'
          placeholder={`${t('placeholder.asset')}`}
          name={`asset.${index}.asset`}
          fetchDataFn={getAssetCode}
          isViewProp={isView}
          columns={[
            {
              header: 'Mã tài sản',
              fieldName: 'asset.sku',
            },
            {
              header: 'Tên tài sản',
              fieldName: 'asset.name',
            },
          ]}
          onChangeValue={async (val) => {
            if (val) {
              setValue(`asset.${index}.asset.name`, '')
              setValue(`asset.${index}.quantity`, null)
              setValue(`asset.${index}.uom`, null)
              setValue(`asset.${index}.requestQuantity`, NaN)

              const result = await getStockPickingReceiptProductId({
                warehouseTypes: 'INTERNAL',
                productIds: val.productId,
              })
              setValue(`asset.${index}.quantity`, result.data[0]?.quantity ?? 0)
              setValue(`asset.${index}.asset`, {
                ...val?.asset,
                id: val?.productId,
                code: val?.asset?.sku,
              })
              setValue(`asset.${index}.asset.name`, val.asset.name)
              setValue(`asset.${index}.uom`, {
                id: val.asset.uomId,
                name: val.asset.uomName,
              })
            } else {
              setValue(`asset.${index}.asset.name`, '')
              setValue(`asset.${index}.quantity`, null)
              setValue(`asset.${index}.uom`, null)
              setValue(`asset.${index}.requestQuantity`, undefined)
            }
          }}
          disabled={isInvalidAllocation()}
          trigger={trigger}
        />
      ),
      assetName: (
        <CoreInput
          key={item.key}
          control={control}
          name={`asset.${index}.asset.name`}
          label=''
          placeholder={''}
          isViewProp={true}
        />
      ),
      quantity: (
        <div className='flex gap-4'>
          <Typography>{watch(`asset.${index}.quantity`)}</Typography>
          <Typography>{watch(`asset.${index}.uom.name`)}</Typography>
        </div>
      ),
      requestQuantity: !isView ? (
        <CoreInput
          key={item.key}
          control={control}
          name={`asset.${index}.requestQuantity`}
          label=''
          placeholder={t('placeholder.requestQuantity')}
          type='number'
          required={true}
          rules={{
            required: t('common:validation.required'),
            validate: {
              maxLength: (value: any) => {
                const quantity = watch(`asset.${index}.quantity`) ?? 0
                if (value <= Number(quantity)) {
                  clearErrors(`asset.${index}.requestQuantity`)
                  return
                }
                return 'Nhập quá số lượng'
              },
            },
          }}
          disableDecimal
          disableNegative
          inputProps={{
            maxLength: 250,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='start'>
                <Typography sx={{ paddingLeft: '8px' }} color={'#000000DE'}>
                  {watch(`asset.${index}.uom.name`)}
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      ) : (
        <div className='flex gap-2'>
          <Typography>{watch(`asset.${index}.requestQuantity`)}</Typography>
          <Typography>{watch(`asset.${index}.uom.name`)}</Typography>
        </div>
      ),
      deleteRow: !isView ? (
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
      ) : (
        <></>
      ),
    }
  })

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    (isUpdate && isCopy) || isCreate
      ? postRequestAllocationSave
      : putRequestAllocationSave,
    {
      onSuccess: ({ data }) => {
        toastSuccess(t('common:message.success'))
        router.push({
          pathname: `${MENU_URL.REQUEST_ALLOCATION}/[id]`,
          query: {
            id: data.data.id,
            actionType: 'VIEW',
          },
        })
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const {
    data: dataRequestAllocationDetail,
    isLoading: isLoadingRequestAllocationDetail,
  } = useQueryGetRequestAllocationDetail(
    {
      id: id,
    },
    { enabled: isUpdate }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const handleChangeStatus = async (status: string) => {
    if (isUpdate && dataRequestAllocationDetail) {
      try {
        await changeStatusApprove({ id: id, status: status })
        toastSuccess(t('common:message.success'))
      } catch (error) {
        toastError(error, setError)
      }
    }
  }

  useEffect(() => {
    if (dataRequestAllocationDetail) {
      if (isCopy) {
        reset({
          ...dataRequestAllocationDetail.data,
          code: `${dataRequestAllocationDetail.data.code}-copy`,
          status: '',
          asset: dataRequestAllocationDetail.data.asset,
        })
      } else {
        reset({
          ...dataRequestAllocationDetail.data,
          asset: dataRequestAllocationDetail.data.asset,
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionType, dataRequestAllocationDetail])

  useEffect(() => {
    if (org) {
      setValue('org', org)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [
    {
      methods,
      org,
      dataRequestAllocationDetail: dataRequestAllocationDetail?.data,
      isView,
      isUpdate,
      isCopy,
      isCreate,
      isLoadingSubmit,
      isLoadingRequestAllocationDetail,
      id,
      columns,
      dataTable,
    },
    { t, onSubmit, appendAllocationLineField, handleChangeStatus },
  ] as const
}
