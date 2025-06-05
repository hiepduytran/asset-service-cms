import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/paramAsset/getList/type'
import { useQueryParamAssetList } from '@/service/asset/paramAsset/getList'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  partner: {
    id: null,
    name: 'Tất cả'
  },
  page: 0,
  size: 20,
}

export const useParamAssetList = () => {
  const { t } = useTranslation(TRANSLATE.PARAM_ASSET)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const { convertToDate } = useDate()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.updatedAt'),
          fieldName: 'updatedAt',
        },
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.codeAsset'),
          fieldName: 'codeAsset',
        },
        {
          header: t('table.nameAsset'),
          fieldName: 'nameAsset',
        },
        {
          header: t('table.uom'),
          fieldName: 'uom',
        },
        {
          header: t('table.partner'),
          fieldName: 'partner',
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
    setQueryPage({
      ...input,
      partnerId: input?.partner?.id,
    })
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryParamAssetList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      code: <Typography sx={{ fontWeight: 500 }}>{item?.code}</Typography>,
      codeAsset: item?.product?.sku,
      nameAsset: item?.product?.name,
      productCategory: item?.product?.productCategory?.name,
      updatedAt: convertToDate(item?.updatedAt),
      partner: item?.partner?.name,
      uom: item?.uom?.name,
    }
  })

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      page: data?.data?.page,
      size: data?.data?.size,
      totalPages: data?.data?.totalPages,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
