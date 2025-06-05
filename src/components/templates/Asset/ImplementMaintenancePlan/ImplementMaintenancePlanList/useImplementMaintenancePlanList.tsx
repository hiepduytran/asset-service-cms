import { ColumnProps } from '@/components/organism/CoreTable'
import { convertExecutionStatus, convertPlanType } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  getImplementMaintenancePlanDetailList,
  useQueryGetImplementMaintenancePlanList,
} from '@/service/asset/implementMaintenancePlan/list'
import {
  RequestParam,
  ResponseBody,
} from '@/service/asset/implementMaintenancePlan/list/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  planType: null,
}

export const useImplementMaintenancePlanList = () => {
  const { t } = useTranslation(TRANSLATE.IMPLEMENT_MAINTENANCE_PLAN)
  const methods = useFormCustom<
    RequestParam['GET']['ImplementMaintenancePlanList']
  >({
    defaultValues,
  })
  const { reset, handleSubmit, setError } = methods
  const [isLoadingChild, setIsLoadingChild] =
    useState<{
      [id: number]: boolean
    }>()
  const [dataChild, setDataChild] =
    useState<ResponseBody['GET']['ImplementMaintenancePlanDetailList']>()

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const {
    isFetching: isLoadingImplementMaintenancePlanList,
    data: dataImplementMaintenancePlanList,
    refetch,
  } = useQueryGetImplementMaintenancePlanList({
    ...queryPage,
  })

  const fetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      const result = await getImplementMaintenancePlanDetailList({
        planMaintenanceId: id,
      })
      if (result) {
        setDataChild(result)
        setIsLoadingChild({ [id]: false })
      }
    } catch (error) {
      toastError(error, setError)
    }
  }

  const columns = useMemo(() => {
    return [
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.planType'),
        fieldName: 'planType',
      },
      {
        header: t('table.totalAssets'),
        fieldName: 'totalAssets',
      },
      {
        header: t('table.done'),
        fieldName: 'done',
      },
      {
        header: t('table.pending'),
        fieldName: 'pending',
      },
      {
        header: t('table.inProcess'),
        fieldName: 'inProcess',
      },
      {
        header: t('table.startDate'),
        fieldName: 'startDate',
      },
      {
        header: t('table.expectedDate'),
        fieldName: 'expectedDate',
      },
      {
        header: t('table.actualDate'),
        fieldName: 'actualDate',
      },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const columnsChild = useMemo(() => {
    return [
      {
        header: t('tableChild.dic'),
        fieldName: 'dic',
      },
      {
        header: t('tableChild.name'),
        fieldName: 'name',
      },
      {
        header: t('tableChild.department'),
        fieldName: 'department',
      },
      {
        header: t('tableChild.planType'),
        fieldName: 'planType',
      },
      {
        header: t('tableChild.startDate'),
        fieldName: 'startDate',
      },
      {
        header: t('tableChild.actualEndDate'),
        fieldName: 'actualEndDate',
      },
      {
        header: t('tableChild.check_status'),
        fieldName: 'executionStatus',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const tableData = (
    dataImplementMaintenancePlanList
      ? dataImplementMaintenancePlanList.data.content
      : []
  ).map((item, _) => {
    return {
      ...item,
      planType: convertPlanType(item.planType),
      status: convertExecutionStatus(item.status),
    }
  })

  const tableDataChild = (dataChild ? dataChild.data : []).map((item, _) => {
    return {
      ...item,
      planType: convertPlanType(item.planType),
      executionStatus: convertExecutionStatus(item.executionStatus),
    }
  })

  return [
    {
      methods,
      columns,
      columnsChild,
      isLoadingImplementMaintenancePlanList,
      tableData: tableData,
      dataImplementMaintenancePlanList,
      page: dataImplementMaintenancePlanList
        ? {
            page: dataImplementMaintenancePlanList.data.page,
            size: dataImplementMaintenancePlanList.data.size,
            totalPages: dataImplementMaintenancePlanList.data.totalPages,
          }
        : null,
      isLoadingChild,
      tableDataChild: tableDataChild,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch, fetchDataChild },
  ] as const
}
