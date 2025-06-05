import { useDate } from '@/components/hooks/date/useDate'
import {
  getTypeLabelWithColor,
  IncidentLogListStatus,
} from '@/components/molecules/TextColor'
import { ColumnProps } from '@/components/organism/CoreTable'
import {
  convertAllocationChooseType,
  convertRecordConditionType,
  convertSource,
} from '@/enum'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  getIncidentLogListTimeDetail,
  useQueryGetIncidentLogListIdentity,
  useQueryGetIncidentLogListTime,
} from '@/service/asset/IncidentLogList/list'
import { IncidentLogListTimeDetail } from '@/service/asset/IncidentLogList/list/type'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

type IncidentLogList = {
  search?: string
  date?: string
  source?: string | null
  asset?: {
    id: number
    name: string
    code: string
  }
  assetId?: number
  recordConditionType?: string | null
  page: number
  size: number
  around: string
}
const defaultValues: IncidentLogList = {
  search: '',
  date: '',
  source: null,
  recordConditionType: null,
  page: 0,
  size: 10,
  around: 'IDENTITY',
}
export default function useIncidentLogList() {
  const { convertToDate } = useDate()
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const methods = useFormCustom<IncidentLogList>({
    defaultValues,
  })
  const { handleSubmit, setError, getValues, reset } = methods
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const [queryPage, setQueryPage] = useState<
    Omit<IncidentLogList, 'around' | 'asset'>
  >({
    search: '',
    date: '',
    page: 0,
    size: 10,
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>()
  const [dataChild, setDataChild] = useState<IncidentLogListTimeDetail[]>()

  const onSubmit = handleSubmit((data) => {
    const { around, asset, ...rest } = data
    setQueryPage(rest)
  })

  const onReset = () => {
    setQueryPage(defaultValues)
    reset()
  }

  const {
    data: dataIncidentLogListIdentity,
    isLoading: isLoadingIncidentLogLisIdentity,
  } = useQueryGetIncidentLogListIdentity(queryPage, {
    enabled: getValues('around') === 'IDENTITY',
  })

  const columnsIdentity = useMemo(() => {
    return [
      {
        header: t('table.updateDate'),
        fieldName: 'updateDate',
      },
      {
        header: t('table.source'),
        fieldName: 'source',
      },
      {
        header: t('table.code'),
        fieldName: 'code',
      },
      {
        header: t('table.assetIdentity'),
        fieldName: 'assetCode',
      },
      {
        header: t('table.assetCode'),
        fieldName: 'productCode',
      },
      {
        header: t('table.assetName'),
        fieldName: 'productName',
      },
      {
        header: t('table.updateDate'),
        fieldName: 'assetStatus',
      },
      {
        header: t('table.status'),
        fieldName: 'status',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const dataTableIdentity = (
    dataIncidentLogListIdentity ? dataIncidentLogListIdentity.data.content : []
  ).map((item) => {
    return {
      ...item,
      source: <Typography>{convertSource(item.source)}</Typography>,
      assetStatus: (
        <Typography>{convertRecordConditionType(item.assetStatus)}</Typography>
      ),
      status: getTypeLabelWithColor(item?.approveStatus, IncidentLogListStatus),
    }
  })

  const {
    data: dataIncidentLogListTime,
    isLoading: isLoadingIncidentLogListTime,
  } = useQueryGetIncidentLogListTime(queryPage, {
    enabled: getValues('around') === 'TIME',
  })

  const columnsTime = useMemo(() => {
    return [
      {
        header: t('table.updateDate'),
        fieldName: 'date',
      },
      {
        header: t('table.source_2'),
        fieldName: 'source',
      },
      {
        header: t('table.code_2'),
        fieldName: 'code',
      },
      {
        header: t('table.allocationChooseType'),
        fieldName: 'allocationChooseType',
      },
      {
        header: t('table.org'),
        fieldName: 'org',
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
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]

  const dataTableTime = (
    dataIncidentLogListTime ? dataIncidentLogListTime.data.content : []
  ).map((item) => {
    return {
      ...item,
      source: <Typography>{convertSource(item.source)}</Typography>,
      allocationChooseType: (
        <Typography>
          {convertAllocationChooseType(item.allocationChooseType)}
        </Typography>
      ),
      date: convertToDate(item.date),
      employee: <Typography>{item.employee ?? '--'}</Typography>,
      department: <Typography>{item.department ?? '--'}</Typography>,
    }
  })

  const columnsTimeChild = useMemo(() => {
    return [
      {
        header: t('table.assetIdentity'),
        fieldName: 'code',
      },
      {
        header: t('table.assetCode'),
        fieldName: 'sku',
      },
      {
        header: t('table.assetName'),
        fieldName: 'name',
      },
      {
        header: t('table.status_2'),
        fieldName: 'status',
      },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]) as ColumnProps[]
  const fetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })

      const result = await getIncidentLogListTimeDetail({
        id: id,
      })
      if (result) {
        setDataChild(result.data)
        setIsLoadingChild({ [id]: false })
      }
    } catch (error) {
      toastError(error, setError)
    }
  }

  const dataTableTimeChild = (dataChild ?? []).map((item) => {
    return { ...item, status: convertRecordConditionType(item.status) }
  })
  return [
    {
      methods,
      router,
      columnsIdentity,
      dataTableIdentity,
      isLoadingIncidentLogLisIdentity,
      pageIdentity: dataIncidentLogListIdentity
        ? {
            page: dataIncidentLogListIdentity.data.page,
            size: dataIncidentLogListIdentity.data.size,
            totalPages: dataIncidentLogListIdentity.data.totalPages,
          }
        : null,
      columnsTime,
      dataTableTime,
      isLoadingIncidentLogListTime,
      pageTime: dataIncidentLogListTime
        ? {
            page: dataIncidentLogListTime.data.page,
            size: dataIncidentLogListTime.data.size,
            totalPages: dataIncidentLogListTime.data.totalPages,
          }
        : null,
      columnsTimeChild,
      dataTableTimeChild,
      isLoadingChild,
      anchorEl,
      defaultValues,
    },
    {
      t,
      onSubmit,
      onReset,
      onChangePageSize,
      setAnchorEl,
      fetchDataChild,
      setQueryPage,
    },
  ] as const
}
