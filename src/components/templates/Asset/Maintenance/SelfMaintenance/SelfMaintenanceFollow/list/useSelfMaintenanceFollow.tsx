import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  postJobZenForecast,
  useGetListMaintenanceCard,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/list'
import { RequestParams } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceFollow/list/type'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorText } from '../utils'
import { toastError, toastSuccess } from '@/toast'

const defaultValues = {
  page: 0,
  size: 20,
  search: '',
  state: null,
  startDate: '',
}
export default function useSelfMaintenanceFollow() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormCustom({ defaultValues })
  const { handleSubmit, reset } = methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id
  const [queryPage, setQueryPage] =
    useState<RequestParams['GET']['ListMaintenanceCard']>(defaultValues)

  const {
    data: dataListMaintenanceCard,
    isFetching: isLoadingListMaintenanceCard,
  } = useGetListMaintenanceCard(queryPage)

  const onSubmit = handleSubmit((data) => {
    setQueryPage(data)
  })

  const onReset = () => {
    reset()
    setQueryPage(defaultValues)
  }

  const onChangePageSize = (val: any) => {
    const { size, page } = val
    const input = { ...queryPage, size, page }
    setQueryPage(input)
  }

  const onRowClick = (data: any) => {
    router.push({
      pathname: `${MENU_URL.MAINTENANCE.SELF_MAINTENANCE.SELF_MAINTENANCE_FOLLOW}/[id]`,
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

  const tableData = (
    dataListMaintenanceCard ? dataListMaintenanceCard.data.content : []
  ).map((item) => {
    return {
      ...item,
      state: colorText(item.state),
    }
  })
  const generateSelfMaintenanceTicket = async () => {
    try {
      await postJobZenForecast({}).then((res) => {
        if (res?.data) {
          toastSuccess(t('common:message.success'))
        }
      })
    } catch (error) {
      toastError(error)
    }
  }
  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      tableData,
      isLoadingListMaintenanceCard,
      page: dataListMaintenanceCard
        ? {
            page: dataListMaintenanceCard?.data?.page,
            size: dataListMaintenanceCard?.data?.size,
            totalPages: dataListMaintenanceCard?.data?.totalPages,
          }
        : null,
    },
    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      onRowClick,
      generateSelfMaintenanceTicket,
    },
  ] as const
}
