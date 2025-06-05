import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import { useGetListMaintenancesCard } from '@/service/asset/maintenance/selfMaintenance/SelfMaintenanceForm/list'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorText } from '../utils'

const defaultValues = {
  page: 0,
  size: 20,
  state: null,
}

export default function useSelfMaintenanceForm() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom({ defaultValues })
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const { reset, handleSubmit } = methods

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

  const {
    data: maintenancesCardData,
    isFetching: isLoadingMaintenancesCardData,
  } = useGetListMaintenancesCard(queryPage)

  const onChangePageSize = (val: any) => {
    const { size, page } = val
    const input = { ...queryPage, size, page }
    setQueryPage(input)
  }

  const onRowClick = (data: any) => {
    router.push({
      pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FORM}/[id]`,
      query: { id: data, actionType: 'VIEW' },
    })
  }

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
        header: t('table.nameProduct'),
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

  const tableData = (
    maintenancesCardData ? maintenancesCardData.data.content : []
  ).map((item, _) => {
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
      isLoadingMaintenancesCardData,
      page: maintenancesCardData
        ? {
            page: maintenancesCardData?.data?.page,
            size: maintenancesCardData?.data?.size,
            totalPages: maintenancesCardData?.data?.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize, onRowClick },
  ] as const
}
