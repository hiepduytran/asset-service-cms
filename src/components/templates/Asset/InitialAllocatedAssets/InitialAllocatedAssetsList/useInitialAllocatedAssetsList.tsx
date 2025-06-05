import { useDate } from '@/components/hooks/date/useDate'
import { getTypeData } from '@/components/molecules/TextColor'
import { ColumnProps } from '@/components/organism/CoreTable'
import { typeOfInitialAllocation } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryInitialAllocatedAssetsList } from '@/service/asset/initialAllocatedAssets/getList'
import { getParameter } from '@/service/asset/initialAllocatedAssets/getList/getParameter'
import { InitialAllocationParameter } from '@/service/asset/initialAllocatedAssets/getList/getParameter/type'
import { RequestBody } from '@/service/asset/initialAllocatedAssets/getList/type'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  requestDate: '',
  desiredAllocationDate: '',
  chooseType: null,
  page: 0,
  size: 20,
}

export const useInitialAllocatedAssetsList = () => {
  const { t } = useTranslation(TRANSLATE.INITIAL_ALLOCATED_ASSETS)
  const { convertToDate } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(
    _.omitBy(defaultValues, _.isNil)
  )
  const onChangePageSize = (val: RequestBody['GET']) => {
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
  } = useQueryInitialAllocatedAssetsList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.initialAllocationCode'),
          fieldName: 'code',
        },
        {
          header: t('label.updateDate'),
          fieldName: 'updateDate',
        },
        {
          header: t('label.allocateDate'),
          fieldName: 'requestDate',
        },
        {
          header: t('table.allocationObject'),
          fieldName: 'allocationChooseType',
        },
        {
          header: t('label.organization'),
          fieldName: 'organization',
        },
        {
          header: t('label.part'),
          fieldName: 'department',
        },
        {
          header: t('label.staff'),
          fieldName: 'employee',
        },
        {
          header: t('table.quantity'),
          fieldName: 'quantity',
        },
      ] as ColumnProps[],
    [t]
  )
  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      updateDate: convertToDate(item?.updateDate),
      requestDate: convertToDate(item?.requestDate),
      allocationChooseType: getTypeData(
        item?.allocationChooseType,
        typeOfInitialAllocation
      ),
      organization: item?.organization?.name ?? '--',
      department: item?.department?.name ?? '--',
      employee: item?.employee?.name ?? '--',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.assetCode'),
          fieldName: 'assetCode',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('table.quantity'),
          fieldName: 'quantity',
        },
      ] as ColumnProps[],
    [t]
  )
  const [dataChild, setDataChild] = useState<InitialAllocationParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getParameter({ id: id }).then((res) => {
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
      assetCode: item?.product?.code,
      assetName: item?.product?.name,
      quantity: `${item?.quantity} ${item?.uom?.name}`,
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
