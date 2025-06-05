import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useGetAllStandardMaintenance } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list'
import { RequestBody } from '@/service/asset/maintenance/selfMaintenance/standardDeclare/list/type'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorText } from '../../utils'
import _ from 'lodash'
const defaultValues = {
  search: '',
  state: null,
}
export default function useStandardDeclare() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom<RequestBody['GET']>({ defaultValues })
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

  const onRowClick = (data: any) => {
    router.push({
      pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.STANDARD_DECLARE}/[id]`,
      query: { id: data, actionType: 'VIEW' },
    })
  }

  const columns = useMemo(() => {
    return [
      {
        header: t('table.sku'),
        fieldName: 'product.sku',
      },
      {
        header: t('table.nameProduct'),
        fieldName: 'product.name',
      },
      {
        header: t('table.state'),
        fieldName: 'state',
      },
    ]
  }, [t]) as ColumnProps[]

  const {
    data: standardMaintenanceData,
    isFetching: isLoadingStandardMaintenanceData,
  } = useGetAllStandardMaintenance(queryPage)

  const tableData = (
    standardMaintenanceData ? standardMaintenanceData.data.content : []
  ).map((item, index) => {
    return {
      ...item,
      state: colorText(item.state),
    }
  })

  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingStandardMaintenanceData,
      page: standardMaintenanceData
        ? {
            page: standardMaintenanceData?.data?.page,
            size: standardMaintenanceData?.data?.size,
            totalPages: standardMaintenanceData?.data?.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize, onRowClick },
  ] as const
}
