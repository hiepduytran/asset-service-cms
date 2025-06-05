import { ColumnProps } from '@/components/organism/CoreTable'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import { RequestBody } from '@/service/asset/incidentList/getIncidentHistoryList/type'
import { Typography } from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useQueryIncidentHistoryList } from '@/service/asset/incidentList/getIncidentHistoryList'
import { convertIncidentSource } from '@/enum'
import { RED } from '@/helper/colors'

const defaultValues = {
  search: '',
  department: {
    id: null,
    name: 'Tất cả',
  },
  severityManagement: {
    id: null,
    name: 'Tất cả',
  },
  isHandle: null,
  page: 0,
  size: 20,
}

export const useIncidentHistoryList = () => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const router = useRouter()
  const { id, code, name, view } = router.query
  const viewType = view ?? 'INCIDENT'
  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
  })
  const { reset, handleSubmit } = methodForm
  const columns = useMemo(
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
          fieldName: 'severityLevel',
        },
        {
          header: t('table.reason'),
          fieldName: 'reason',
        },
        {
          header: t('table.incidentLocation'),
          fieldName: 'incidentLocation',
        },
        {
          header: t('table.recorder'),
          fieldName: 'recorder',
        },
        {
          header: t('table.recordingTime'),
          fieldName: 'recordingTime',
        },
        {
          header: t('table.source'),
          fieldName: 'source',
        },
        {
          header: t('table.processingStatus'),
          fieldName: 'processingStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const columnsMaintenance = useMemo(
    () =>
      [
        {
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.planDate'),
          fieldName: 'planDate',
        },
        {
          header: t('table.createdBy'),
          fieldName: 'createdBy',
        },
        {
          header: t('table.incident'),
          fieldName: 'incident',
        },
        {
          header: t('table.processingStatus'),
          fieldName: 'processingStatus',
        },
        {
          header: t('table.processingDate'),
          fieldName: 'processingDate',
        },
        {
          header: t('table.postProcessingStatus'),
          fieldName: 'postProcessingStatus',
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
    setQueryPage({
      ...input,
      departmentId: input?.department?.id,
      severityManagementId: input?.severityManagement?.id,
    })
  })

  const {
    isLoading: isLoadingTable,
    data,
    refetch,
  } = useQueryIncidentHistoryList({
    ...queryPage,
    assetId: id
  },
    { enabled: viewType === 'INCIDENT' }
  )

  const tableData = (data?.data?.content ?? []).map((item) => {
    return {
      ...item,
      severityLevel: item?.severityManagement?.name,
      incidentLocation: item?.incidentLocation?.name,
      recorder: item?.recorder?.name,
      source: convertIncidentSource(item?.selfMaintenanceType),
      processingStatus: (<Typography color={RED}>Chưa xử lý</Typography>),
    }
  })

  return [
    {
      methodForm,
      columns,
      columnsMaintenance,
      isLoadingTable,
      tableData,
      data: data?.data,
      id,
      code,
      name,
      viewType,
      router
    },
    { t, onSubmit, onReset, onChangePageSize, refetch },
  ] as const
}
