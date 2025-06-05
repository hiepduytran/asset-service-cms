import { ColumnProps } from '@/components/organism/CoreTable'
import { MENU_URL } from '@/routes'
import { useQueryGetStockPickingWarehouseReceiptDetail } from '@/service/asset/recovery/getList'
import {
  StockPickingWarehouseReceipt,
  StockPickingWarehouseReceiptDetail,
} from '@/service/asset/recovery/getList/type'
import { Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useAssetWarehouseReceipt(props: {
  dataStockPickingWarehouseReceipt: StockPickingWarehouseReceipt[]
}) {
  const { dataStockPickingWarehouseReceipt } = props
  const { t } = useTranslation(MENU_URL.RECOVERY)
  const methods = useFormContext<StockPickingWarehouseReceiptDetail>()
  const { control, reset, getValues, setValue } = methods
  const { fields } = useFieldArray({
    control,
    name: 'stockPickingLines',
    keyName: 'key',
  })

  const columnsChild = useMemo(() => {
    return [
      {
        header: t('table.assetCode'),
        fieldName: 'product.sku',
      },
      {
        header: t('table.assetName'),
        fieldName: 'product.name',
      },
      {
        header: t('table.quantity'),
        fieldName: 'demandQty',
      },
      {
        header: t('table.actualQuantityImported'),
        fieldName: 'doneQty',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const {
    data: dataStockPickingWarehouseReceiptDetail,
    isLoading: isLoadingStockPickingWarehouseReceiptDetail,
  } = useQueryGetStockPickingWarehouseReceiptDetail(
    {
      id: dataStockPickingWarehouseReceipt[0]?.id,
    },
    {
      enabled: !!dataStockPickingWarehouseReceipt[0]?.id,
    }
  )

  useEffect(() => {
    if (dataStockPickingWarehouseReceiptDetail) {
      reset(dataStockPickingWarehouseReceiptDetail.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStockPickingWarehouseReceiptDetail])

  const tableData = fields.map((item, index) => {
    return {
      ...item,
      demandQty: (
        <Typography>
          {item.demandQty} {item.product.uom.name}
        </Typography>
      ),
      doneQty: (
        <Typography color={getValues('state') === 'DONE' ? '#0078D4' : ''}>
          {item.doneQty} {item.product.uom.name}
        </Typography>
      ),
    }
  })

  const textColor = (text: string, t?: any) => {
    if (text === 'DONE') {
      return <Typography color={'#00CC6A'}>{t('text.stocked')}</Typography>
    } else {
      return <Typography color={'#F57322'}>{t('text.notStocked')}</Typography>
    }
  }
  return [
    {
      methods,
      columnsChild,
      tableData,
      isLoadingStockPickingWarehouseReceiptDetail,
    },
    { t, textColor },
  ] as const
}
