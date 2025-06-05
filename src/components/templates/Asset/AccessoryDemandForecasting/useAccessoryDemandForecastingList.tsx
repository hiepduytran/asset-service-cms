import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/requestAllocation/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useQueryGetAccessoryDemandForecastingList } from '@/service/asset/accessoryDemandForecasting'
import moment from 'moment'
import { FORMAT_DATE_API, useDate } from '@/components/hooks/date/useDate'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  startDate: '',
  endDate: '',
}

export const useAccessoryDemandForecastingList = () => {
  const { t } = useTranslation(TRANSLATE.ACCESSORY_DEMAND_FORECASTING)
  const { getDateNow } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues: {
      ...defaultValues,
      startDate: getDateNow() ?? '',
      endDate: moment(getDateNow()).add(7, 'days').format(FORMAT_DATE_API),
    },
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

  const {
    isFetching: isLoadingTable,
    data,
    refetch,
  } = useQueryGetAccessoryDemandForecastingList(queryPage)

  return [
    {
      methodForm,
      isLoadingTable,
      tableData: data?.data,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
