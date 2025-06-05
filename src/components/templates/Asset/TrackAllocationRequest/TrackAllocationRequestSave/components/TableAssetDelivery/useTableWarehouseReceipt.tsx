import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { StockPickingWarehouseReceipt } from '@/service/asset/recovery/getList/type'
import {
  getStockPickingDeliveryDetail,
  useQueryGetStockPickingDelivery,
} from '@/service/asset/trackAllocationRequest/getList'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function useTableWarehouseReceipt(props: {
  cardId: number
  id: number
}) {
  const { id } = props
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormCustom<StockPickingWarehouseReceipt>()
  const { reset } = methods

  const { convertToDate } = useDate()

  const [isShowDialog, setIsShowDialog] = useState<{
    isShow: boolean
    productId?: number
  }>({
    isShow: false,
  })
  const [isFirstDialog, setIsFirstDialog] = useState<boolean>(true)

  const changeIsFirstDialog = useCallback(() => {
    setIsFirstDialog(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const hideDialog = () => {
    setIsShowDialog({
      isShow: false,
    })
  }

  const {
    data: dataStockPickingDeliver,
    isLoading: isLoadingStockPickingDeliver,
  } = useQueryGetStockPickingDelivery({
    orderId: id,
  })

  const textColor = (text: string) => {
    if (text === 'DONE')
      return <Typography color={'#00CC6A'}>Hoàn thành</Typography>

    if (text === 'WAITING' || text === 'PROCESSING')
      return <Typography color={'#F58020'}>Chưa hoàn thành</Typography>

    if (text === 'PROCESSING')
      return <Typography color={'#F58020'}>Đang xử lý</Typography>
    else {
      return ''
    }
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('Mã phiếu nhập'),
          fieldName: 'code',
        },
        {
          header: t('Ngày nhập thực tế'),
          fieldName: 'doneDate',
        },
        {
          header: t('Người xuất kho'),
          fieldName: 'employee',
        },
        {
          header: t('Xuất từ kho'),
          fieldName: 'warehouse.name',
        },
        {
          header: t('Trạng thái '),
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
    dataStockPickingDeliver ? dataStockPickingDeliver.data : []
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
          header: t('Mã tài sản'),
          fieldName: 'product.sku',
        },
        {
          header: t('Tên tài sản'),
          fieldName: 'product.name',
        },
        {
          header: t('Số lượng yêu cầu'),
          fieldName: 'demandQty',
        },
        {
          header: t('Số lượng xuất thực tế'),
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
      const result = await getStockPickingDeliveryDetail({ id: id })
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
        <div className='flex gap-4 text-[#0078D4]'>
          <Typography>
            {(item.inventories ?? []).reduce((acc: number, cur: any) => {
              return acc + cur.doneQty
            }, 0)}
          </Typography>
          <Typography>{item.product.uom.name}</Typography>
        </div>
      ),
    }
  })

  return [
    {
      methods,
      dataStockPickingDeliver: dataStockPickingDeliver
        ? dataStockPickingDeliver.data
        : [],
      columns,
      tableData,
      isLoadingStockPickingDeliver,
      tableDataChild,
      dataChild,
      isLoadingChild,
      columnsChild,
      isFirstDialog,
      isShowDialog,
    },
    {
      t,
      handleFetchDataChild,
      hideDialog,
      changeIsFirstDialog,
      setIsShowDialog,
    },
  ] as const
}
