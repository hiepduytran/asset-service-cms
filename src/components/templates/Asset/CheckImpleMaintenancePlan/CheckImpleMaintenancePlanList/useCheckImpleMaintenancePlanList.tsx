import { ColumnProps } from '@/components/organism/CoreTable'
import { convertPlanType, textColor } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryImplementMaintenancePlanCheck } from '@/service/asset/checkImpleMaintenancePlan/list'
import { RequestParam } from '@/service/asset/checkImpleMaintenancePlan/list/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  planType: null,
}

export const useCheckImplMaintenancePlanList = () => {
  const { t } = useTranslation(TRANSLATE.CHECK_IMPLEMENT_MAINTENANCE_PLAN)
  const methodForm = useFormCustom<RequestParam['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }

    setQueryPage(input)
  }

  const onReset = () => {
    methodForm.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.asset_code'),
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
          header: t('tableChild.actualStartDate'),
          fieldName: 'actualEndDate',
        },
        {
          header: t('tableChild.check_status'),
          fieldName: 'checkStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const {
    isFetching: isLoadingImplementMaintenancePlanCheck,
    data: dataImplementMaintenancePlanCheck,
    refetch: refetchImplementMaintenancePlanCheck,
  } = useQueryImplementMaintenancePlanCheck({
    ...queryPage,
  })

  const tableData = (
    dataImplementMaintenancePlanCheck?.data?.content ?? []
  ).map((item) => {
    return {
      ...item,
      planType: convertPlanType(item.planType),
      checkStatus: textColor(item.checkStatus),
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoadingImplementMaintenancePlanCheck,
      tableData,
      page: dataImplementMaintenancePlanCheck
        ? {
            page: dataImplementMaintenancePlanCheck.data.page,
            size: dataImplementMaintenancePlanCheck.data.size,
            totalPages: dataImplementMaintenancePlanCheck.data.totalPages,
          }
        : null,
    },
    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      refetchImplementMaintenancePlanCheck,
    },
  ] as const
}
