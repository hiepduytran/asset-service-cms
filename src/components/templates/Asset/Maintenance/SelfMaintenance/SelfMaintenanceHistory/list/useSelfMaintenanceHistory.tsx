import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetListAutoMaintenancesHistory } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/list'
import { RequestParam } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/list/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  departmentIds: [],
  status: null,
}
const useSelfMaintenanceHistory = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<RequestParam['LIST']>({ defaultValues })
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [queryPage, setQueryPage] =
    useState<RequestParam['LIST']>(defaultValues)
  const { handleSubmit, reset } = methods

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...input, page, size })
  }

  const {
    data: dataListAutoMaintenances,
    isLoading: isLoadingListAutoMaintenances,
  } = useGetListAutoMaintenancesHistory(queryPage)

  const onSubmit = handleSubmit((data) => {
    const { department, ...rest } = data
    setQueryPage(rest)
  })

  const onReset = () => {
    setQueryPage(defaultValues)
    reset(defaultValues)
  }

  const columns = useMemo(() => {
    return [
      {
        header: t('Mã định danh(DIC)'),
        fieldName: 'asset.code',
      },
      {
        header: t('Mã tài sản'),
        fieldName: 'product.sku',
      },
      {
        header: t('Tên tài sản'),
        fieldName: 'product.name',
      },
      {
        header: t('Bộ phận'),
        fieldName: 'department.name',
      },
      {
        header: t('Thời gian bắt đầu tự bảo dưỡng'),
        fieldName: 'maintenanceStartTime',
      },
      {
        header: t('Ngày tự bảo dưỡng gần nhất'),
        fieldName: 'maintenanceDateNearly',
      },
      {
        header: t('Trạng thái tự báo dưỡng'),
        fieldName: 'status',
      },
    ] as ColumnProps[]
  }, [t])

  const convertStatus = (status: string) => {
    if (status === 'ACTIVE')
      return <Typography color={'#00CC6A'}>Đang thực hiện</Typography>
    if (status === 'PAUSED')
      return <Typography color={'#F57322'}>Tạm dừng</Typography>
  }

  const tableData = (
    dataListAutoMaintenances ? dataListAutoMaintenances.data.content : []
  ).map((item) => {
    return { ...item, status: convertStatus(item.status) }
  })

  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingListAutoMaintenances: isLoadingListAutoMaintenances,
      page: dataListAutoMaintenances
        ? {
            page: dataListAutoMaintenances.data.page,
            size: dataListAutoMaintenances.data.size,
            totalPages: dataListAutoMaintenances.data.totalPages,
          }
        : null,
    },
    { t, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useSelfMaintenanceHistory
