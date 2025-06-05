import { ColumnProps } from '@/components/organism/CoreTable'
import { textColor } from '@/enum'
import { toastError } from '@/toast'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  planMaintenanceAllocationChild,
  useQueryListPlanMaintenanceAllocation,
} from '@/service/asset/trackMaintenancePartAllocation/list'
import {
  RequestBody,
  ResponseBody,
} from '@/service/asset/trackMaintenancePartAllocation/list/type'

import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  page: 0,
  size: 10,
  status: null,
}

export const useTrackMaintenancePartAllocationList = () => {
  const { t } = useTranslation(TRANSLATE.TRACK_MAINTENANCE_PART_ALLOCATION)
  const methods = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const [dataChild, setDataChild] =
    useState<ResponseBody['GET']['ListPlanMaintenanceAllocationChild']>()
  const [isLoadingChild, setIsLoadingChild] =
    useState<{
      [id: number]: boolean
    }>()
  const { setError } = methods
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(defaultValues, _.isNil)
  )

  const {
    data: dataPlanMaintenanceAllocation,
    isLoading: isLoadingPlanMaintenanceAllocation,
  } = useQueryListPlanMaintenanceAllocation({
    ...queryPage,
  })

  const tableData = (
    dataPlanMaintenanceAllocation
      ? dataPlanMaintenanceAllocation.data.content
      : []
  ).map((item, _) => {
    return {
      ...item,
      status: textColor(item.status),
    }
  })

  const tableDataChild = (dataChild ? dataChild.data : []).map((item, _) => {
    return {
      ...item,
    }
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const onReset = () => {
    methods.reset(defaultValues)
    const input = _.omitBy(defaultValues, (v) => _.isNil(v))
    setQueryPage(input)
  }

  const onSubmit = methods.handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const optionStatus = [
    { label: `${t('text.ALL')}`, value: null },
    { label: `${t('text.ALLOCATED')}`, value: 'ALLOCATED' },
    { label: `${t('text.NOT_ALLOCATION')}`, value: 'NOT_ALLOCATION' },
  ]

  const columns = useMemo(() => {
    return [
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.requestDate'),
        fieldName: 'requestDate',
      },
      {
        header: t('table.maintenanceAccessory'),
        fieldName: 'maintenanceAccessory',
      },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const columnsChild = useMemo(() => {
    return [
      {
        header: t('table_child.product'),
        fieldName: 'product.name',
      },
      {
        header: t('table_child.uom'),
        fieldName: 'uom.name',
      },
      {
        header: t('table_child.request'),
        fieldName: 'request',
      },
      {
        header: t('table_child.allocated'),
        fieldName: 'allocated',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const fetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })

      const data = await planMaintenanceAllocationChild({
        planMaintenanceId: id,
      })
      if (data) {
        setDataChild(data)
        setIsLoadingChild({ [id]: false })
      }
    } catch (error) {
      toastError(error, setError)
    }
  }
  return [
    {
      methods,
      isLoadingPlanMaintenanceAllocation,
      isLoadingChild,
      tableData: tableData,
      tableDataChild: tableDataChild,
      optionStatus,
      columns,
      columnsChild,
      page: dataPlanMaintenanceAllocation
        ? {
            page: dataPlanMaintenanceAllocation?.data?.page,
            size: dataPlanMaintenanceAllocation?.data?.size,
            totalPages: dataPlanMaintenanceAllocation?.data?.totalPages,
          }
        : null,
    },
    { t, onSubmit, onReset, onChangePageSize, fetchDataChild },
  ] as const
}
