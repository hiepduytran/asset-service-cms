import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryReasonList } from '@/service/asset/reason/getList'
import { RequestBody } from '@/service/asset/reason/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  isActive: null,
  page: 0,
  size: 20,
}

export const useReasonList = () => {
  const { t } = useTranslation(TRANSLATE.REASON)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
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
          header: t('common:status'),
          fieldName: 'status',
        },
      ] as ColumnProps[],
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
    reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryReasonList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item?.code}</Typography>,
      status: item?.isActive ? 'Active' : 'Inactive',
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
