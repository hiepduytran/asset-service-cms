import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/standardDeclaration/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'
import { useQueryAnnualMaintenancePlanList } from '@/service/asset/maintenancePlan/annualMaintenancePlan/getList'
import { getTypeData, getTypeLabelWithColor, StateWithColor } from '@/components/molecules/TextColor'
import moment from 'moment'
import { planTypeOfMaintenancePlan } from '@/enum'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  planType: null,
}

export const useAnnualMaintenancePlanList = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.planType'),
          fieldName: 'planType',
        },
        {
          header: t('table.createDate'),
          fieldName: 'createDate',
        },
        {
          header: t('table.approveEnum'),
          fieldName: 'approveEnum',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )

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

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryAnnualMaintenancePlanList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item?.code}</Typography>,
      planType: getTypeData(item?.planType, planTypeOfMaintenancePlan),
      createDate: item?.createDate,
      approveEnum: getTypeLabelWithColor(item?.approveEnum, StateWithColor)
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      data: data?.data,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
