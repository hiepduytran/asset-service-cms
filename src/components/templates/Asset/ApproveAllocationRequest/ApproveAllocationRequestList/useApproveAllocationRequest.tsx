import { useDate } from '@/components/hooks/date/useDate'
import {
  getTypeLabelWithColor,
  StateWithColor,
  StateWithColorAllocation,
} from '@/components/molecules/TextColor'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertOrganization } from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryGetApproveAllocationRequestList } from '@/service/asset/approveAllocationRequest/getList'
import { RequestBody } from '@/service/asset/approveAllocationRequest/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  requestDate: '',
  desiredAllocationDate: '',
  allocationChooseType: null,
  status: null,
}

export const useApproveAllocationRequestList = () => {
  const { t } = useTranslation(TRANSLATE.APPROVE_ALLOCATION_REQUEST)
  const { convertToDate } = useDate()
  const methods = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methods

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
          fieldName: 'quantity',
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
    reset(defaultValues)
    setQueryPage(defaultValues)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data: dataGetApproveAllocationRequestList,
    refetch,
  } = useQueryGetApproveAllocationRequestList({
    ...queryPage,
    departmentId: queryPage?.departmentId?.id,
  })

  const tableData = (
    dataGetApproveAllocationRequestList
      ? dataGetApproveAllocationRequestList.data.content
      : []
  ).map((item: any) => {
    return {
      ...item,
      requestDate: convertToDate(item.requestDate),
      updateDate: convertToDate(item.updateDate),
      allocationChooseType: convertOrganization(item.allocationChooseType, t),
      organization: item.organization ?? '--',
      department: item.department ?? '--',
      employee: item.employee ?? '--',
      status: getTypeLabelWithColor(item.status, StateWithColorAllocation),
    }
  })

  return [
    {
      methods,
      columns,
      isLoadingTable,
      tableData,
      page: dataGetApproveAllocationRequestList
        ? {
            page: dataGetApproveAllocationRequestList.data.page,
            size: dataGetApproveAllocationRequestList.data.size,
            totalPages: dataGetApproveAllocationRequestList.data.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
