import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertOrganization, textColor } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  getAssetRecoveryDetail,
  useQueryRecoveryList,
} from '@/service/asset/recovery/getList'
import {
  AssetRecoveryDetail,
  RequestBody,
} from '@/service/asset/recovery/getList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  allocationChooseType: null,
  status: null,
  page: 0,
  size: 10,
}

export const useRecoveryList = () => {
  const { t } = useTranslation(TRANSLATE.RECOVERY)
  const methods = useFormCustom<RequestBody['GET_LIST']>({
    defaultValues,
  })
  const router = useRouter()
  const { reset, handleSubmit } = methods
  const { convertToDate } = useDate()

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
    isLoading: isLoadingRecoveryList,
    data: dataRecoveryList,
    refetch,
  } = useQueryRecoveryList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.recoveryCode'),
          fieldName: 'code',
        },
        {
          header: t('table.requestDate'),
          fieldName: 'requestDate',
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
          header: t('table.quantityRecall'),
          fieldName: 'quantityRecall',
        },
        {
          header: t('table.allocationStatus'),
          fieldName: 'allocationStatus',
        },
      ] as ColumnProps[],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
  const tableData = useMemo(() => {
    return (dataRecoveryList?.data?.content ?? [])?.map((item) => ({
      ...item,
      requestDate: convertToDate(item.requestDate),
      updateDate: convertToDate(item.updateDate),
      allocationChooseType: convertOrganization(item.allocationChooseType, t),
      organization: item.organization ?? '--',
      department: item.department ?? '--',
      employee: item.employee ?? '--',
      quantityRecall: (
        <Typography>
          {item.quantityRecall}/{item.quantity}
        </Typography>
      ),
      allocationStatus: textColor(item.allocationStatus),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRecoveryList])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table_child.identity'),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [dataChild])

  return [
    {
      router,
      methods,
      isLoadingRecoveryList,
      columns,
      tableData,
      page: dataRecoveryList
        ? {
          page: dataRecoveryList.data.page,
          size: dataRecoveryList.data.size,
          totalPages: dataRecoveryList.data.totalPages,
        }
        : null,
      columnsChild,
      dataChild: tableDataChild,
      isLoadingChild,
    },
    {
      t,
      onReset,
      onSubmit,
      onChangePageSize,
      refetch,
      handleFetchDataChild,
    },
  ] as const
}
