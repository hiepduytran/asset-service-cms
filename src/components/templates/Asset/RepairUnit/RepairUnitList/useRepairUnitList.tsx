import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryRepairUnitList } from '@/service/asset/repairUnit/getList'
import { getRepairUnitParameter } from '@/service/asset/repairUnit/getList/getParameter'
import { RepairUnitParameter } from '@/service/asset/repairUnit/getList/getParameter/type'
import { RequestBody } from '@/service/asset/repairUnit/getList/type'
import { toastError } from '@/toast'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useRepairUnitList = () => {
  const { t } = useTranslation(TRANSLATE.REPAIR_UNIT)
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleSelect = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.unitCode'),
          fieldName: 'code',
        },
        {
          header: t('table.unitName'),
          fieldName: 'name',
        },
        // {
        //   header: t('phoneNumber'),
        //   fieldName: 'phoneNumber',
        // },
        {
          header: t('table.asset'),
          fieldName: 'product',
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
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage(input)
  })

  const {
    isLoading: isLoadingTable,
    data,
  } = useQueryRepairUnitList(queryPage)

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
    }
  })

  const columnsChild = useMemo(
    () =>
      [
        {
          header: 'SKU',
          fieldName: 'code',
        },
        {
          header: t('table.assetName'),
          fieldName: 'name',
        },
      ] as ColumnProps[],
    [t]
  )

  const [dataChild, setDataChild] = useState<RepairUnitParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getRepairUnitParameter({ id: id }).then((res) => {
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
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, dataChild])

  return [
    {
      methodForm,
      columns,
      isLoadingTable,
      tableData,
      data: data?.data,
      columnsChild,
      dataChild: tableDataChild,
      isLoadingChild,
      anchorEl,
      open,
    },
    { t, onSubmit, onReset, onChangePageSize, handleSelect, setAnchorEl, handleFetchDataChild },
  ] as const
}
