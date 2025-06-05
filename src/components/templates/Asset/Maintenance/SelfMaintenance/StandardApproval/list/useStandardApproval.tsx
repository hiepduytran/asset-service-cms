import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetStandardApprovalList } from '@/service/asset/maintenance/selfMaintenance/standardApproval/list'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorText } from '../utils'

const defaultValues = {
  size: 20,
  page: 0,
  search: '',
  state: null,
}

export default function useStandardApproval() {
  const { t } = useTranslation(TRANSLATE.STANDARD_APPROVAL)
  const methods = useFormCustom({ defaultValues })
  const { handleSubmit, reset } = methods
  const router = useRouter()
  const { actionType } = router.query
  const id = Number(router.query?.id)
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

  const { data, isFetching } = useQueryGetStandardApprovalList({
    ...queryPage,
  })

  const onChangePageSize = (val: any) => {
    const { size, page } = val
    const input = { ...queryPage, size, page }
    setQueryPage(input)
  }

  const columns = useMemo(() => {
    return [
      {
        header: t('table.sku'),
        fieldName: 'code',
      },
      {
        header: t('table.name'),
        fieldName: 'name',
      },
      {
        header: t('table.state'),
        fieldName: 'status',
      },
    ]
  }, [t]) as ColumnProps[]

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      code: item?.product?.sku,
      name: item?.product?.name,
      status: colorText(item?.state),
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  return [
    {
      methods,
      router,
      isView,
      isUpdate,
      columns,
      isFetching,
      data: data?.data,
      tableData: tableData,
    },
    { t, onSubmit, onReset, onChangePageSize },
  ] as const
}
