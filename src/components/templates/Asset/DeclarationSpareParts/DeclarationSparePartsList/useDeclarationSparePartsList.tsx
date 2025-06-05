import { ColumnProps } from '@/components/organism/CoreTable'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useAssetAccessoryList } from '@/service/asset/declarationSpareParts/getList'
import { getAssetAccessoryParameter } from '@/service/asset/declarationSpareParts/getList/getAssetAccessoryParameter'
import { AssetAccessoryParameter } from '@/service/asset/declarationSpareParts/getList/getAssetAccessoryParameter/type'
import { RequestBody } from '@/service/asset/declarationSpareParts/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useDeclarationSparePartsList = () => {
  const { t } = useTranslation(TRANSLATE.DECLARATION_SPARE_PARTS)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: RequestBody['GET']) => {
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
  } = useAssetAccessoryList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.assetCode'),
          fieldName: 'code',
        },
        {
          header: t('table.assetName'),
          fieldName: 'name',
        },
        {
          header: t('table.accessory'),
          fieldName: 'itemQuantity',
        },
      ] as ColumnProps[],
    [t]
  )
  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.sparePartCode'),
          fieldName: 'sparePartCode',
          styleCell: {
            style: {
              width: '160px',
            },
          },
        },
        {
          header: t('table.sparePartName'),
          fieldName: 'sparePartName',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const [dataChild, setDataChild] = useState<AssetAccessoryParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getAssetAccessoryParameter({ assetAccessoryId: id }).then((res) => {
        setDataChild(res?.data?.content)
        setIsLoadingChild({ [id]: false })
      })
    } catch (error) {
      toastError(error)
    }
  }
  const tableDataChild = useMemo(() => {
    return dataChild?.map((item) => ({
      ...item,
      sparePartCode: item?.product?.code,
      sparePartName: item?.product?.name,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataChild])

  return [
    {
      methodForm,
      isLoadingTable,
      columns,
      tableData,
      data: data?.data,
      columnsChild,
      dataChild: tableDataChild,
      isLoadingChild,
    },
    { t, onReset, onSubmit, onChangePageSize, refetch, handleFetchDataChild },
  ] as const
}
