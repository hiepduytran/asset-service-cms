import CoreInput from '@/components/atoms/CoreInput'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetTrackAllocationRequestDetail } from '@/service/asset/trackAllocationRequest/get'
import { RequestAllocationDetail } from '@/service/asset/trackAllocationRequest/get/type'
import { useQueryGetStockPickingDelivery } from '@/service/asset/trackAllocationRequest/getList'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const useTrackAllocationRequestSave = () => {
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormCustom<RequestAllocationDetail>()
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query.id)
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { control, reset } = methods

  const {
    data: dataGetRequestAllocationDetail,
    isLoading: isLoadingGetRequestAllocationDetail,
  } = useQueryGetTrackAllocationRequestDetail(
    {
      id: id,
    },
    { enabled: isUpdate }
  )

  const {
    data: dataStockPickingDeliver,
    isLoading: isLoadingStockPickingDeliver,
  } = useQueryGetStockPickingDelivery(
    { orderId: id },
    { enabled: !!id }
  )

  const { fields: allocationLineFields } = useFieldArray({
    control: control,
    name: `asset`,
    keyName: 'key',
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('assetTableDetail.assetCode'),
          fieldName: 'asset',
          styleCell: {
            sx: {
              minWidth: 200,
            },
          },
        },
        {
          header: t('assetTableDetail.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('assetTableDetail.quantity'),
          fieldName: 'quantity',
        },
        {
          header: t('assetTableDetail.requestQuantity'),
          fieldName: 'requestQuantity',
        },
      ] as ColumnProps[],
    [t]
  )

  const dataTable = allocationLineFields.map((item, index) => {
    return {
      asset: (
        <CoreInput
          control={control}
          name={`asset.${index}.asset.code`}
          label=''
          isViewProp={true}
        />
      ),
      assetName: (
        <CoreInput
          control={control}
          name={`asset.${index}.asset.name`}
          label=''
          isViewProp={true}
        />
      ),
      quantity: (
        <div className='flex gap-4'>
          <Typography>{item.quantity}</Typography>
          <Typography>{item.uom?.name}</Typography>
        </div>
      ),
      requestQuantity: (
        <div className='flex gap-4'>
          <Typography>{item.requestQuantity}</Typography>
          <Typography>{item.uom?.name}</Typography>
        </div>
      ),
    }
  })

  useEffect(() => {
    if (dataGetRequestAllocationDetail) {
      reset(dataGetRequestAllocationDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataGetRequestAllocationDetail])

  return [
    {
      router,
      id,
      t,
      columns,
      dataTable,
      methods,
      isView,
      isUpdate,
      isLoadingGetRequestAllocationDetail,
      dataStockPickingDeliver: dataStockPickingDeliver?.data,
      isLoadingStockPickingDeliver,
    },
    {},
  ] as const
}
