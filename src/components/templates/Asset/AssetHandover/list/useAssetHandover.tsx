import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertOrganization, textColor } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { getAssetRecoveryDetail } from '@/service/asset/assetHandover/detail'
import { AssetRecoveryDetail } from '@/service/asset/assetHandover/detail/type'
import { useQueryGetTransferAssetList } from '@/service/asset/assetHandover/list'
import { RequestParam } from '@/service/asset/assetHandover/list/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  allocationChooseType: null,
  status: null,
}

export const useAssetHandover = () => {
  const { t } = useTranslation(TRANSLATE.ASSET_HANDOVER)
  const { convertToDate } = useDate()
  const methods = useFormCustom<RequestParam['LIST']>({
    defaultValues,
  })

  const { reset, handleSubmit } = methods

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
    setQueryPage(defaultValues)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const {
    isFetching: isLoadingTable,
    data,
    refetch,
  } = useQueryGetTransferAssetList({
    ...queryPage,
  })

  const columns = useMemo(
    () => [
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.updateDate'),
        fieldName: 'updateDate',
      },
      {
        header: t('table.allocationChooseType'),
        fieldName: 'allocationChooseType',
      },
      {
        header: t('table.organization'),
        fieldName: 'organization',
      },
      {
        header: t('table.department'),
        fieldName: 'department',
      },
      {
        header: t('table.employee'),
        fieldName: 'employee',
      },
      {
        header: t('table.quantity'),
        fieldName: 'quantity',
      },
      {
        header: t('table.statusOfRequest'),
        fieldName: 'allocationStatus',
      },
    ],
    [t]
  ) as ColumnProps[]

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      updateDate: convertToDate(item.updateDate),
      allocationChooseType: convertOrganization(item.allocationChooseType, t),
      organization: item.organization ?? '--',
      department: item.department ?? '--',
      employee: item.employee ?? '--',
      allocationStatus: textColor(item.allocationStatus),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table_child.assetIdentity'),
          fieldName: 'assetIdentity',
        },
        {
          header: t('table_child.code'),
          fieldName: 'asset.code',
        },
        {
          header: t('table_child.name'),
          fieldName: 'asset.name',
        },
        {
          header: t('table_child.status'),
          fieldName: 'status',
        },
      ] as ColumnProps[],
    [t]
  )
  const [dataChild, setDataChild] = useState<AssetRecoveryDetail[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      const result = await getAssetRecoveryDetail({ id: id })
      setDataChild(result.data)
      setIsLoadingChild({ [id]: false })
    } catch (error) {
      toastError(error)
    }
  }
  const tableDataChild = useMemo(() => {
    return dataChild?.map((item) => ({
      ...item,
      status: textColor(item.status),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataChild])
  return [
    {
      methods,
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
