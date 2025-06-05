import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL } from '@/routes'
import {
  getStockPickingWarehouseReceiptDetail,
  useQueryGetStockPickingWarehouseReceipt,
} from '@/service/asset/recovery/getList'
import { StockPickingWarehouseReceipt } from '@/service/asset/recovery/getList/type'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function useTableWarehouseReceipt(props: {
  cardId: number
  id: number
}) {
  const { id, cardId } = props
  const { t } = useTranslation(MENU_URL.RECOVERY)
  const methods = useFormCustom<StockPickingWarehouseReceipt>()
  const { getValues, reset } = methods

  const { convertToDate } = useDate()

  const {
    data: dataStockPickingWarehouseReceipt,
    isLoading: isLoadingStockPickingWarehouseReceipt,
  } = useQueryGetStockPickingWarehouseReceipt({
    orderId: id,
  })

  const textColor = (text: string) => {
    if (text === 'DONE')
      return <Typography color={'#00CC6A'}>{t('text.completed')}</Typography>

    if (text === 'WAITING' || text === 'PROCESSING')
      return <Typography color={'#F58020'}>{t('text.notCompleted')}</Typography>

    if (text === 'PROCESSING')
      return <Typography color={'#F58020'}>{t('text.inProcess')}</Typography>
    else {
      return ''
    }
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('label.importReceiptCode'),
          fieldName: 'code',
        },
        {
          header: t('table.actualEntryDate'),
          fieldName: 'doneDate',
        },
        {
          header: t('label.Người nhập kho'),
          fieldName: 'employee',
        },
        {
          header: t('label.stockedBy'),
          fieldName: 'warehouse.name',
        },
        {
          header: t('table.statusOfRequest'),
          fieldName: 'state',
        },
        {
          header: t(''),
          fieldName: 'dropDown',
          styleCell: {
            style: {
              minWidth: '100px',
            },
          },
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const tableData = (
    dataStockPickingWarehouseReceipt
      ? dataStockPickingWarehouseReceipt.data
      : []
  ).map((item) => {
    return {
      ...item,
      doneDate: convertToDate(item.doneDate),
      employee: (
        <Typography>
          {item.employee?.lastName} {item.employee?.firstName}
        </Typography>
      ),
      state: textColor(item.state),
    }
  })

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.assetCode'),
          fieldName: 'product.sku',
        },
        {
          header: t('table.assetName'),
          fieldName: 'product.name',
        },
        {
          header: t('table.requestQuantity'),
          fieldName: 'demandQty',
        },
        {
          header: t('table.actualQuantityExported'),
          fieldName: 'doneQty',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const [dataChild, setDataChild] = useState<any>()
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      const result = await getStockPickingWarehouseReceiptDetail({ id: id })
      setDataChild(result.data.stockPickingLines)
      reset(result.data)
      setIsLoadingChild({ [id]: false })
    } catch (error) {
      toastError(error)
    }
  }

  const tableDataChild = (dataChild || []).map((item: any) => {
    return {
      ...item,
      demandQty: (
        <div className='flex gap-4'>
          <Typography>{item.demandQty}</Typography>
          <Typography>{item.product.uom.name}</Typography>
        </div>
      ),
      doneQty: (
        <div className='flex gap-4'>
          <Typography>{item.doneQty}</Typography>
          <Typography>{item.product.uom.name}</Typography>
        </div>
      ),
    }
  })

  return [
    {
      methods,
      dataStockPickingWarehouseReceipt: dataStockPickingWarehouseReceipt
        ? dataStockPickingWarehouseReceipt.data
        : [],
      columns,
      tableData,
      isLoadingStockPickingWarehouseReceipt,
      tableDataChild,
      dataChild,
      isLoadingChild,
      columnsChild,
    },
    { t, handleFetchDataChild },
  ] as const
}
