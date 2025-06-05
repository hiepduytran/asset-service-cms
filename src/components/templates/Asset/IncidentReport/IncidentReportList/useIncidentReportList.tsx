import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { RED } from '@/helper/colors'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { useQueryIncidentReportList } from '@/service/asset/incidentReport/getList'
import { getIncidentReportParameter } from '@/service/asset/incidentReport/getList/getParameter'
import { IncidentReportParameter } from '@/service/asset/incidentReport/getList/getParameter/type'
import { RequestBody } from '@/service/asset/incidentReport/getList/type'
import { toastError } from '@/toast'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useMemo, useState } from 'react'

const defaultValues = {
  search: '',
  severityManagement: {
    id: null,
    name: 'Tất cả',
  },
  department: {
    id: null,
    name: 'Tất cả',
  },
  page: 0,
  size: 20,
}

export const useIncidentReportList = () => {
  const { t } = useTranslation(TRANSLATE.INCIDENT_REPORT)
  const { convertToDate } = useDate()
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
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
    setQueryPage({
      ...input,
      severityManagementId: input?.severityManagement?.id,
      departmentId: input?.department?.id,
    })
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryIncidentReportList(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.ticketCode'),
          fieldName: 'code',
        },
        {
          header: t('table.ticketName'),
          fieldName: 'name',
        },
        {
          header: t('table.identifierCode'),
          fieldName: 'dic',
        },
        {
          header: t('table.assetName'),
          fieldName: 'assetName',
        },
        {
          header: t('table.machineDetails'),
          fieldName: 'detail',
        },
        {
          header: t('table.recordingDate'),
          fieldName: 'recordingTime',
        },
        {
          header: t('table.department'),
          fieldName: 'department',
        },
        {
          header: t('table.recorder'),
          fieldName: 'recorder',
        },
        {
          header: t('table.statusAsset'),
          fieldName: 'statusAsset',
        },
        {
          header: t('table.statusPlan'),
          fieldName: 'statusPlan',
        },
        {
          header: t('table.statusHandle'),
          fieldName: 'statusHandle',
        },
        {
          header: t('table.postProcessingStatus'),
          fieldName: 'postProcessingStatus',
        },
        {
          header: t('table.note'),
          fieldName: 'note',
        },
      ] as ColumnProps[],
    [t]
  )

  const tableData = useMemo(() => {
    return (data?.data?.content ?? [])?.map((item) => ({
      ...item,
      dic: item?.asset?.code,
      assetName: item?.product?.name,
      detail: item?.quantityIncident,
      department: item?.department?.name,
      recordingTime: convertToDate(item?.recordingTime),
      recorder: item?.recorder?.name,
      statusAsset: item?.severityManagement?.name,
      statusPlan: <Typography color={RED}>Chưa lập kế hoạch</Typography>,
      statusHandle: <Typography color={RED}>Chưa xử lý</Typography>,
      postProcessingStatus: 'N/A',
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, data])

  const columnsChild = useMemo(
    () =>
      [
        {
          header: t('table.incidentCode'),
          fieldName: 'code',
        },
        {
          header: t('table.incidentName'),
          fieldName: 'name',
        },
        {
          header: t('table.severityLevel'),
          fieldName: 'severityManagement',
        },
        {
          header: t('table.incidentLocation'),
          fieldName: 'incidentLocation',
        },
      ] as ColumnProps[],
    [t]
  )

  const [dataChild, setDataChild] = useState<IncidentReportParameter[]>([])
  const [isLoadingChild, setIsLoadingChild] = useState<{
    [id: number]: boolean
  }>({})
  const handleFetchDataChild = async (id: number) => {
    try {
      setIsLoadingChild({ [id]: true })
      await getIncidentReportParameter({ id: id }).then((res) => {
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
      severityManagement:
        item?.severityLevels[item?.severityLevels?.length - 1]
          ?.severityManagement?.name,
      incidentLocation: item?.incidentLocation?.name,
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
    { t, onSubmit, onReset, onChangePageSize, refetch, handleFetchDataChild },
  ] as const
}
