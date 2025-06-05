import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetStockPickingDeliveryDetail } from '@/service/asset/trackAllocationRequest/getList'
import {
  StockPickingDelivery,
  StockPickingDeliveryDetail,
} from '@/service/asset/trackAllocationRequest/getList/type'
import { Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useAssetDelivery(props: {
  dataStockPickingDeliver: StockPickingDelivery[]
}) {
  const { dataStockPickingDeliver } = props
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormCustom<StockPickingDeliveryDetail>()
  const { control, reset } = methods
  const [isFirstDialog, setIsFirstDialog] = useState<boolean>(true)

  const { fields } = useFieldArray({
    control,
    name: 'stockPickingLines',
    keyName: 'key',
  })

  const changeIsFirstDialog = useCallback(() => {
    setIsFirstDialog(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const [isShowDialog, setIsShowDialog] = useState<{
    isShow: boolean
    productId?: number
  }>({
    isShow: false,
  })

  const hideDialog = () => {
    setIsShowDialog({
      isShow: false,
    })
  }

  const columnsChild = useMemo(() => {
    return [
      {
        header: t('assetTableDetail.assetCode'),
        fieldName: 'product.sku',
      },
      {
        header: t('assetTableDetail.assetName'),
        fieldName: 'product.name',
      },
      {
        header: t('assetTableDetail.requestQuantity'),
        fieldName: 'demandQty',
      },
      {
        header: t('assetTableDetail.doneQty'),
        fieldName: 'doneQty',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const {
    data: dataStockPickingDeliveryDetail,
    isLoading: isLoadingStockPickingDeliveryDetail,
  } = useQueryGetStockPickingDeliveryDetail(
    {
      id: dataStockPickingDeliver[0]?.id,
    },
    {
      enabled: !!dataStockPickingDeliver[0]?.id,
    }
  )

  useEffect(() => {
    if (dataStockPickingDeliveryDetail) {
      reset({
        ...dataStockPickingDeliveryDetail.data,
        employee: {
          ...dataStockPickingDeliveryDetail.data.employee,
          fullName: dataStockPickingDeliveryDetail.data.employee?.fullName
            ? `${dataStockPickingDeliveryDetail.data.employee?.fullName}`
            : `${
                dataStockPickingDeliveryDetail.data.employee?.lastName ?? ''
              } ${
                dataStockPickingDeliveryDetail.data.employee?.firstName ?? ''
              }`,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStockPickingDeliveryDetail])

  const tableData = fields.map((item, index) => {
    return {
      ...item,
      demandQty: (
        <div className='flex gap-4'>
          <Typography>{item.demandQty}</Typography>
          <Typography>{item.product.uom?.name}</Typography>
        </div>
      ),
      doneQty: (
        <div className='flex gap-4 text-[#0078D4]'>
          <Typography>
            {item.inventories ? item.inventories[0]?.doneQty : 0}
          </Typography>
          <Typography>{item.product.uom?.name}</Typography>
        </div>
      ),
    }
  })
  return [
    {
      methods,
      columnsChild,
      tableData,
      isLoadingStockPickingDeliveryDetail,
      isShowDialog,
      isFirstDialog,
    },
    { t, setIsShowDialog, hideDialog, changeIsFirstDialog },
  ] as const
}
