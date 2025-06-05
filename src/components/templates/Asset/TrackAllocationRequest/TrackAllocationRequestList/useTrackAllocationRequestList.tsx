import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertOrganization, textColor } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/requestAllocation/getList/type'
import { useQueryGetTrackAllocationRequestList } from '@/service/asset/trackAllocationRequest/getList'
import { getRequestAllocationFollow } from '@/service/asset/trackAllocationRequest/getList/getRequestAllocationParameter'
import { RequestAllocationParameter } from '@/service/asset/trackAllocationRequest/getList/getRequestAllocationParameter/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: "",
  page: 0,
  size: 10,
  requestDate: '',
  desiredAllocationDate: '',
  allocationChooseType: null,
  status: null,
}

export const useTrackAllocationRequestList = () => {
  const { t } = useTranslation(TRANSLATE.TRACK_ALLOCATION_REQUEST)
  const methods = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
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

  const optionState = [
    { value: null, label: t('common:all') },
    { value: 'NOT_ALLOCATION', label: `${t('text.NOT_ALLOCATION')}` },
    { value: 'ONE_PART_ALLOCATION', label: `${t('text.ONE_PART_ALLOCATION')}` },
    { value: 'ALLOCATED', label: `${t('text.ALLOCATED')}` },
  ]

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
  } = useQueryGetTrackAllocationRequestList({
    ...queryPage,
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.requestCode'),
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
          fieldName: 'requestQuantity',
        },
        {
          header: t('table.allocated'),
          fieldName: 'allocatedQuantity',
        },
        {
          header: t('table.status'),
          fieldName: 'status',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      requestDate: convertToDate(item.requestDate),
      updateDate: convertToDate(item.updateDate),
      allocationChooseType: convertOrganization(item.allocationChooseType, t),
      organization: item.organization ?? '--',
      department: item.department ?? '--',
      employee: item.employee ?? '--',
      allocatedQuantity: (
        <Typography>
          {item.allocatedQuantity}/{item.requestQuantity}
        </Typography>
      ),
      status: textColor(item.allocationStatus),
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])
  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('assetTableDetail.assetCode'),
          fieldName: 'asset.code',
        },
        {
          header: t('assetTableDetail.assetName'),
          fieldName: 'asset.name',
        },

        {
          header: t('assetTableDetail.quantity'),
          fieldName: 'requestQuantity',
        },
        {
          header: t('table.allocated'),
          fieldName: 'allocatedQuantity',
        },
        {
          header: t('table.status'),
          fieldName: 'allocationStatus',
        },
      ] as ColumnProps[],
    [t]
  )
  const [dataChild, setDataChild] = useState<RequestAllocationParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getRequestAllocationFollow({ id: id }).then((res) => {
        setDataChild(res?.data)
        setIsLoadingChild({ [id]: false })
      })
    } catch (error) {
      toastError(error)
    }
  }
  
  const tableDataChild = useMemo(() => {
    return dataChild?.map((item) => ({
      ...item,
      allocatedQuantity: (
        <div className='flex gap-1'>
          <Typography>{item.allocatedQuantity ?? 0}</Typography>/
          <Typography>{item.requestQuantity}</Typography>
        </div>
      ),
      allocationStatus: textColor(item.allocationStatus),
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
      optionState,
    },
    { t, onReset, onSubmit, onChangePageSize, refetch, handleFetchDataChild },
  ] as const
}
