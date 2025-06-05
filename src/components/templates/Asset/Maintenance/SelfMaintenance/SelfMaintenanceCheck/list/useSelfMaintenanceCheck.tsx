import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetListAutoMaintenances } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/list'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useGetListAutoMaintenancesCheck } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/list'
import { Typography } from '@mui/material'
import { RequestParams } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/list/type'
const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  testStatus: null,
}
const useSelfMaintenanceCheck = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<RequestParams['ListAuditMaintenance']>({
    defaultValues,
  })
  const { handleSubmit, reset, watch } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [queryPage, setQueryPage] =
    useState<RequestParams['ListAuditMaintenance']>(defaultValues)

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...input, page, size })
  }

  const {
    data: dataListAutoMaintenancesCheck,
    isLoading: isLoadingListAutoMaintenancesCheck,
  } = useGetListAutoMaintenancesCheck(queryPage)

  const onSubmit = handleSubmit((data) => {
    setQueryPage(data)
  })

  const onReset = () => {
    setQueryPage(defaultValues)
    reset(defaultValues)
  }

  const convertTestStatus = (status: string) => {
    if (status === 'CHECKED')
      return <Typography color={'#00CC6A'}>Đã kiểm tra</Typography>
    if (status === 'UNCHECKED')
      return <Typography color={'#F57322'}>Chưa kiểm tra</Typography>
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
        header: t('Ngày tự bảo dưỡng gần nhất'),
        fieldName: 'maintenanceDate',
      },
      {
        header: t('Ca bảo dưỡng'),
        fieldName: 'shift.name',
      },
      {
        header: t('Trạng thái kiếm tra'),
        fieldName: 'testStatus',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const tableData = (
    dataListAutoMaintenancesCheck
      ? dataListAutoMaintenancesCheck.data.content
      : []
  ).map((item) => {
    return { ...item, testStatus: convertTestStatus(item.testStatus) }
  })

  return [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingListAutoMaintenancesCheck,
      page: dataListAutoMaintenancesCheck
        ? {
            page: dataListAutoMaintenancesCheck.data.page,
            size: dataListAutoMaintenancesCheck.data.size,
            totalPages: dataListAutoMaintenancesCheck.data.totalPages,
          }
        : null,
    },
    { t, onChangePageSize, onSubmit, onReset },
  ] as const
}

export default useSelfMaintenanceCheck
