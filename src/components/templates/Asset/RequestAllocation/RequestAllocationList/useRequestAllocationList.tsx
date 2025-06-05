import { useDate } from '@/components/hooks/date/useDate'
import {
  getTypeLabelWithColor,
  StateWithColor,
  StateWithColorAllocation,
} from '@/components/molecules/TextColor'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertOrganization } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetRequestAllocationList } from '@/service/asset/requestAllocation/getList'
import { getRequestAllocationDetails } from '@/service/asset/requestAllocation/getList/getRequestAllocationParameter'
import { RequestAllocationParameter } from '@/service/asset/requestAllocation/getList/getRequestAllocationParameter/type'
import { RequestBody } from '@/service/asset/requestAllocation/getList/type'
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

export const useRequestAllocationList = () => {
  const { t } = useTranslation(TRANSLATE.REQUEST_ALLOCATION)
  const { convertToDate } = useDate()
  const methods = useFormCustom<RequestBody['GET']>({
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
  } = useQueryGetRequestAllocationList({
    ...queryPage,
    departmentId: queryPage?.departmentId?.id,
  })

  const columns = useMemo(
    () => [
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
        fieldName: 'quantity',
      },
      {
        header: t('table.status'),
        fieldName: 'statusOfRequest',
      },
    ],
    [t]
  ) as ColumnProps[]

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      requestDate: convertToDate(item.requestDate),
      updateDate: convertToDate(item.updateDate),
      allocationChooseType: convertOrganization(item.allocationChooseType, t),
      organization: item.organization ?? '--',
      department: item.department ?? '--',
      employee: item.employee ?? '--',
      statusOfRequest: getTypeLabelWithColor(
        item.status,
        StateWithColorAllocation
      ),
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
          fieldName: 'quantity',
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
      await getRequestAllocationDetails({ id: id }).then((res) => {
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
      quantity: (
        <div className='flex gap-4'>
          <Typography>{item.requestQuantity}</Typography>
          <Typography>{item.uom?.name}</Typography>
        </div>
      ),
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
