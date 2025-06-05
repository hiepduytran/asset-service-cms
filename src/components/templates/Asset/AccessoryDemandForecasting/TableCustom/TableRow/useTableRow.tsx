import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { getAccessoryDemandDetailParameter } from '@/service/asset/accessoryDemandForecasting/TableDetailParameter'
import { AccessoryDemand } from '@/service/asset/accessoryDemandForecasting/TableDetailParameter/type'
import { RequestBody } from '@/service/asset/asset/getList/type'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

type Props = {
  id: number
  maintenanceIds: number[]
}

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useTableRow = ({ id, maintenanceIds }: Props) => {
  const { t } = useTranslation(TRANSLATE.ACCESSORY_DEMAND_FORECASTING)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [listAccessoryDemandDetail, setListAccessoryDemandDetail] = useState<
    AccessoryDemand[]
  >([])
  const [open, setOpen] = useState(false)

  const columns = useMemo(
    () =>
      [
        {
          header: t('maintenanceAccessoryDetailTable.dic'),
          fieldName: 'assetCode',
          styleCell: {
            style: {
              width: '160px',
            },
          },
        },
        {
          header: t('maintenanceAccessoryDetailTable.asset'),
          fieldName: 'assetName',
          styleCell: {
            style: {
              width: '160px',
            },
          },
        },
        {
          header: t('maintenanceAccessoryDetailTable.maintenanceDate'),
          fieldName: 'nextMaintenanceDate',
        },
        {
          header: t('maintenanceAccessoryDetailTable.quantity'),
          fieldName: 'quantity',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return listAccessoryDemandDetail?.map((item) => ({
      assetName: item?.asset?.name,
      quantity: item?.quantity,
      assetCode: item?.asset?.code,
      nextMaintenanceDate: item?.nextMaintenanceDate,
    }))
  }, [listAccessoryDemandDetail])
  const [isLoadingChild, setIsLoadingChild] = useState(false)

  const getListAccessoryDemandDetailParam = async (
    id: number,
    maintenanceIds: number[]
  ) => {
    try {
      setIsLoadingChild(true)
      await getAccessoryDemandDetailParameter({
        maintenanceProductId: id,
        maintenanceAssetIds: maintenanceIds,
      }).then((res) => {
        setListAccessoryDemandDetail(res?.data?.content)
        setIsLoadingChild(false)
      })
    } catch (error) {
      toastError(error)
    }
  }
  const handleOpen = (event: any) => {
    event.stopPropagation()
    if (!open) {
      getListAccessoryDemandDetailParam(id, maintenanceIds).catch(() => {})
    }
    setOpen(!open)
  }
  return [
    {
      methodForm,
      columns,
      open,
      tableData: tableData ?? [],
      isLoadingChild,
    },
    { t, setOpen, handleOpen },
  ] as const
}
