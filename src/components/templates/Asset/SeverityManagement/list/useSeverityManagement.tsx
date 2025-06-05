import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetListSeverityManagement } from '@/service/asset/severityManagement/list'
import { RequestParams } from '@/service/asset/severityManagement/list/type'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
const defaultValues = {
  search: '',
  managementType: 'SEVERITY_MANAGEMENT',
  page: 0,
  size: 10,
}
export default function useSeverityManagement() {
  const { t } = useTranslation(TRANSLATE.SEVERITY_MANAGEMENT)
  const methods = useFormCustom<RequestParams>({ defaultValues })
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestParams>(defaultValues)

  const onChangePageSize = (input: any) => {
    const { page, size } = input
    setQueryPage({ ...defaultValues, page, size })
  }
  const { handleSubmit, reset } = methods
  const {
    data: dataGetListSeverityManagement,
    isLoading: isLoadingGetListSeverityManagement,
  } = useQueryGetListSeverityManagement(queryPage)

  const columns = useMemo(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return [
      {
        header: t('table.list.code'),
        fieldName: 'code',
      },
      {
        header: t('table.list.name'),
        fieldName: 'name',
      },
      {
        header: t('table.list.code'),
        fieldName: 'isActive',
      },
    ] as ColumnProps[]
  }, [t])
  const dataTable = (
    dataGetListSeverityManagement
      ? dataGetListSeverityManagement.data.content
      : []
  ).map((item) => {
    return {
      ...item,
      isActive: (
        <Typography>{item.isActive ? 'Active' : 'Inactive'}</Typography>
      ),
    }
  })

  const onSubmit = handleSubmit((data) => {
    setQueryPage({ ...queryPage, ...data })
  })

  const onReset = () => {
    reset(defaultValues)
    setQueryPage(defaultValues)
  }
  return [
    {
      methods,
      router,
      columns,
      dataTable,
      isLoadingGetListSeverityManagement,
      page: dataGetListSeverityManagement
        ? {
            page: dataGetListSeverityManagement.data.page,
            size: dataGetListSeverityManagement.data.size,
            totalPages: dataGetListSeverityManagement.data.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}
