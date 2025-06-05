import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/firstPeriod/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { useQueryGetFirstPeriodList } from '@/service/asset/firstPeriod/getList'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
}

export const useFirstPeriodList = () => {
  const { t } = useTranslation(TRANSLATE.FIRST_PERIOD)
  const methodForm = useFormCustom<RequestBody['GET']>({
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
    setQueryPage({ ...input })
  })

  const {
    isFetching: isLoadingTable,
    data,
    refetch,
  } = useQueryGetFirstPeriodList({
    ...queryPage,
  })

  return [
    {
      methodForm,
      isLoadingTable,
      tableData: data?.data,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
