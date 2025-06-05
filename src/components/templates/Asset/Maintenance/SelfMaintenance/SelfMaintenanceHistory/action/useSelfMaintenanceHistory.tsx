import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  useGetAutoMaintenancesHistory,
  useGetAutoMaintenancesHistoryIncident,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail'
import { MaintenanceHistoryConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { mergeShifts } from './components/utils'

const defaultValues = {
  search: '',
  startDate: '',
  endDate: '',
  date: '',
  page: 0,
  size: 10,
  around: 'INCIDENT',
  isHandle: null,
}
const useSelfMaintenanceHistoryAction = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const router = useRouter()
  const { id, actionType } = router.query
  const isUpdate = !!id
  const isView = actionType === 'VIEW'
  const methods = useFormCustom<MaintenanceHistoryConvert>({ defaultValues })
  const { reset, watch, getValues, handleSubmit, setValue } = methods
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const { getDateNow, convertToTime } = useDate()

  const [queryPage, setQueryPage] = useState<{
    incidentLocationId?: number | null
    severityManagementId?: number | null
    isHandle?: boolean | null
    date?: string
    startDate?: string
    endDate?: string
    page: number
    size: number
    around?: string
  }>({ ...defaultValues, date: getDateNow() })

  const {
    data: dataAutoMaintenancesHistory,
    isLoading: isLoadingAutoMaintenancesHistory,
    refetch: refetchAutoMaintenancesHistory,
  } = useGetAutoMaintenancesHistory(
    {
      assetId: Number(id),
      date: queryPage.date,
    },
    {
      enabled: watch('around') === 'SELF_MAINTENANCE',
    }
  )

  const {
    data: dataAutoMaintenancesHistoryIncident,
    isLoading: isLoadingAutoMaintenancesHistoryIncident,
  } = useGetAutoMaintenancesHistoryIncident(
    {
      ...queryPage,
      assetId: Number(id),
    },
    {
      enabled: getValues('around') === 'INCIDENT',
    }
  )

  const convertAround = (name: string) => {
    if (name === 'INCIDENT') {
      return <Typography color={'#0078D4'}>Chiều sự cố</Typography>
    } else if (name === 'SELF_MAINTENANCE') {
      return <Typography color={'#0078D4'}>Chiều tự bảo dưỡng</Typography>
    }
  }
  const convertIsHandle = (isHandle: boolean) => {
    if (isHandle) {
      return <Typography color={'#00CC6A'}>Đã xử lý</Typography>
    } else {
      return <Typography color={'#FF0012'}>Chưa xử lý</Typography>
    }
  }

  const columns = useMemo(() => {
    return [
      {
        header: t('Mã sự cố'),
        fieldName: 'code',
      },
      {
        header: t('Tên sự cố'),
        fieldName: 'name',
      },
      {
        header: t('Mức độ nghiêm trọng'),
        fieldName: 'severityManagement.name',
      },
      {
        header: t('Lý do'),
        fieldName: 'reason',
      },
      {
        header: t('Vị trí sự cố'),
        fieldName: 'incidentLocation.name',
      },
      {
        header: t('Người ghi nhận'),
        fieldName: 'recorder.name',
      },
      {
        header: t('Thời gian ghi nhận'),
        fieldName: 'recordingTime',
      },
      {
        header: t('Trạng thái xử lý'),
        fieldName: 'isHandle',
      },
    ] as ColumnProps[]
  }, [t])

  const tableData = (
    dataAutoMaintenancesHistoryIncident
      ? dataAutoMaintenancesHistoryIncident.data.content
      : []
  ).map((item) => {
    return {
      ...item,
      isHandle: convertIsHandle(item.isHandle),
      recordingTime: (
        <Typography>{convertToTime(item.recordingTime)}</Typography>
      ),
    }
  })

  useEffect(() => {
    if (dataAutoMaintenancesHistory) {
      reset({
        ...getValues(),
        ...dataAutoMaintenancesHistory.data,
        maintenanceShifts: mergeShifts(
          dataAutoMaintenancesHistory.data.maintenanceShifts
        ),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAutoMaintenancesHistory])

  const onSubmit = handleSubmit((data) => {
    const {
      incidentLocationId,
      severityManagementId,
      isHandle,
      startDate,
      endDate,
      date,
    } = data
    if (getValues('around') === 'INCIDENT') {
      setQueryPage({
        ...defaultValues,
        incidentLocationId,
        severityManagementId,
        isHandle,
        startDate,
        endDate,
      })
    } else {
      setQueryPage({ ...defaultValues, around: 'SELF_MAINTENANCE', date })
    }
  })

  const onReset = () => {
    if (getValues('around') === 'INCIDENT') {
      reset(defaultValues)
      setQueryPage(defaultValues)
    } else {
      setValue('date', getDateNow())
      setQueryPage({
        ...defaultValues,
        around: 'SELF_MAINTENANCE',
        date: getDateNow(),
      })
    }
  }

  const onChangePageSize = (value: any) => {
    const { page, size } = value
    setQueryPage({ ...queryPage, page, size })
  }

  return [
    {
      id,
      router,
      defaultValues,
      methods,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingAutoMaintenancesHistory,
      anchorEl,
      isLoadingAutoMaintenancesHistoryIncident,
      page: dataAutoMaintenancesHistoryIncident
        ? {
            page: dataAutoMaintenancesHistoryIncident.data.page,
            size: dataAutoMaintenancesHistoryIncident.data.size,
            totalPages: dataAutoMaintenancesHistoryIncident.data.totalPages,
          }
        : null,
    },
    {
      t,
      refetchAutoMaintenancesHistory,
      setAnchorEl,
      convertAround,
      onSubmit,
      onReset,
      onChangePageSize,
    },
  ] as const
}

export default useSelfMaintenanceHistoryAction
