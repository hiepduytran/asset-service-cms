import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/requestAllocation/getList/type'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import _ from 'lodash'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { arrRecoil } from './recoil'
import { useQueryGetMaintenanceForecastingList } from '@/service/asset/maintenanceForecasting'
import moment from 'moment'
import { FORMAT_DATE_API, useDate } from '@/components/hooks/date/useDate'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  departmentId: {
    id: null,
    name: 'Tất cả',
  },
  startDate: '',
  endDate: '',
}

export const useMaintenanceForecastingList = () => {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE_FORECASTING)
  const { getDateNow } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues: {
      ...defaultValues,
      startDate: getDateNow(),
      endDate: moment(getDateNow()).add(7, 'days').format(FORMAT_DATE_API),
    },
  })

  const [forecastingCheckedTable, setForecastingCheckedTable] = useState<any[]>(
    []
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
    const convertDefaultValues = {
      ...defaultValues,
      startDate: null,
      endDate: null,
    }
    methodForm.reset(convertDefaultValues)
    const input = _.omitBy(convertDefaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methodForm.handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const setArr = useSetRecoilState(arrRecoil)

  const [val, setVal] = useRecoilState(arrRecoil)

  const handlePlan = () => {
    setArr(forecastingCheckedTable)
  }

  const {
    isFetching: isLoadingTable,
    data,
    refetch,
  } = useQueryGetMaintenanceForecastingList({
    ...queryPage,
    departmentId: queryPage?.departmentId?.id,
  })
  return [
    {
      methodForm,
      isLoadingTable,
      tableData: data?.data,
      setForecastingCheckedTable,
      forecastingCheckedTable,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch, handlePlan },
  ] as const
}
