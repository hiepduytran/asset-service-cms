import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/asset/getList/type'
import { getAccessoryParameter } from '@/service/asset/maintenanceForecasting/getAccessoryParameter'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useTableCustom = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE_FORECASTING)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [listPartParameter, setListPartParameter] = useState<any[]>([])
  const [open, setOpen] = useState(false)

  const childTableColumns = useMemo(
    () =>
      [
        {
          header: t('accessoryPeriodDetail.accessory'),
          fieldName: 'name',
          styleCell: {
            style: {
              width: '160px',
            },
          },
        },
        {
          header: t('accessoryPeriodDetail.maintenanceDate'),
          fieldName: 'maintenanceDate',
          styleCell: {
            style: {
              width: '160px',
            },
          },
        },
        {
          header: t('accessoryPeriodDetail.currentFrequency'),
          fieldName: 'frequency',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return listPartParameter?.map((item) => ({
      ...item,
      frequency: `${item?.frequency.split(' ')[0]} Giờ`,
      maintenanceDate: (
        <Typography>
          Last: {item?.lastMaintenanceDate}
          <br />
          Next: {item?.nextMaintenanceDate}
        </Typography>
      ),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, listPartParameter])

  const [isLoadingChild, setIsLoadingChild] = useState(false)
  const getListPartParam = async (id: number) => {
    try {
      setIsLoadingChild(true)
      await getAccessoryParameter({ maintenanceForecastId: id }).then((res) => {
        setListPartParameter(res?.data?.content)
        setIsLoadingChild(false)
      })
    } catch (error) {
      toastError(error)
    }
  }

  const handleOpenRow = (id: number, e: any) => {
    e.stopPropagation()
    if (!open) {
      getListPartParam(id)
    }
    setOpen(!open)
  }

  return [
    {
      methodForm,
      childTableColumns,
      open,
      childTableData: tableData ?? [],
      isLoadingChild,
    },
    { t, setOpen, handleOpenRow },
  ] as const
}
