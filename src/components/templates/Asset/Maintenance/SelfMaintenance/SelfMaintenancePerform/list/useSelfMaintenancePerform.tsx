import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useGetListAutoMaintenances } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/list'
import { RequestParams } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/list/type'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  departmentIds: [],
}
const useSelfMaintenancePerform = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<RequestParams['ListAutoMaintenance']>({
    defaultValues,
  })
  const { handleSubmit, reset, watch } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [queryPage, setQueryPage] =
    useState<RequestParams['ListAutoMaintenance']>(defaultValues)

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...input, page, size })
  }

  const {
    data: dataListAutoMaintenances,
    isLoading: isLoadingListAutoMaintenances,
  } = useGetListAutoMaintenances(queryPage)

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
        header: t('Ngày tự bảo dưỡng gần nhất'),
        fieldName: 'maintenanceDate',
      },
      {
        header: t('Ca bảo dưỡng'),
        fieldName: 'shift.name',
      },
      {
        header: t('Tiến độ thực hiện'),
        fieldName: 'progress',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const tableData = (
    dataListAutoMaintenances ? dataListAutoMaintenances.data.content : []
  ).map((item) => {
    return { ...item }
  })

  return [
    {
      methods,
      columns,
      tableData,
      router,
      isLoadingListAutoMaintenances,
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

export default useSelfMaintenancePerform
