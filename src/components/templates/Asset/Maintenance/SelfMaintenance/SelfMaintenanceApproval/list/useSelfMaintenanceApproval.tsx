import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetSelfMaintenanceCardApprovalList } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceApproval/list'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorText } from '../utils'
const defaultValues = {
  size: 20,
  page: 0,
  search: '',
  state: null,
}
export default function useSelfMaintenanceApproval() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom({ defaultValues })
  const { handleSubmit, reset } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onChangePageSize = (val: any) => {
    const { size, page } = val
    const input = { ...queryPage, size, page }
    setQueryPage(input)
  }

  const { data, isFetching } = useQueryGetSelfMaintenanceCardApprovalList({
    ...queryPage,
  })

  const columns = useMemo(() => {
    return [
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.name'),
        fieldName: 'name',
      },
      {
        header: t('table.sku'),
        fieldName: 'sku',
      },
      {
        header: 'Tài sản',
        fieldName: 'nameProduct',
      },
      {
        header: t('table.startDate'),
        fieldName: 'startDate',
      },
      {
        header: t('table.state'),
        fieldName: 'state',
      },
    ]
  }, [t]) as ColumnProps[]

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      state: colorText(item?.state),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      data: data?.data,
      tableData: tableData,
      isFetching,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}
