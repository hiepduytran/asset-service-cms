import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryMethodDeclarationList } from '@/service/asset/methodDeclaration/getList'
import { RequestBody } from '@/service/asset/methodDeclaration/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
  groupStandardId: null,
  isActive: null,
}

export const useMethodDeclaration = () => {
  const { t } = useTranslation(TRANSLATE.METHOD_DECLARATION)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.codeMethod'),
          fieldName: 'code',
        },
        {
          header: t('table.nameMethod'),
          fieldName: 'name',
        },
        {
          header: t('table.standardGroup'),
          fieldName: 'standardGroup',
        },
        {
          header: t('table.tool'),
          fieldName: 'tool',
        },
        {
          header: t('table.status'),
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
  } = useQueryMethodDeclarationList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item?.code}</Typography>,
      standardGroup: item?.groupStandard?.name,
      tool: item?.product?.name,
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
