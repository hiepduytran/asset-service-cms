import { TRANSLATE } from '@/routes'
import { useTranslation } from 'next-i18next'
import { useEffect, useMemo, useState } from 'react'
import _ from 'lodash'
import { useFormCustom } from '@/lib/form'
import { ColumnProps } from '@/components/organism/CoreTable'
import { convertIncidentSource } from '@/enum'
import { useDialog2 } from '@/components/hooks/dialog/useDialog'
import { IconButton, Typography } from '@mui/material'
import { useQueryIncidentHistory } from '@/service/asset/incidentList/getIncidentHistory'
import { BLUE } from '@/helper/colors'
import { useDate } from '@/components/hooks/date/useDate'

export const useDialogIncidentHistory = (props: any) => {
  const { t } = useTranslation(TRANSLATE.WEEKLY_MAINTENANCE_PLAN)
  const { id } = props
  const { showDialog2 } = useDialog2()
  const { convertToTime } = useDate()
  const methodForm = useFormCustom<any>()
  const { reset } = methodForm
  const [queryPage, setQueryPage] = useState<any>(
    _.omitBy(
      {
        page: 0,
        size: 5,
      },
      _.isNil
    )
  )
  const { data, isLoading } = useQueryIncidentHistory({
    ...queryPage,
    id,
  })

  useEffect(() => {
    reset({
      incidentHistory: data?.data?.content,
    })
  }, [data, reset])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    const input = { ...queryPage, page, size }
    setQueryPage(input)
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.incidentName'),
          fieldName: 'name',
        },
        {
          header: t('table.times'),
          fieldName: 'times',
        },
        {
          header: t('table.severityLevel'),
          fieldName: 'severityManagement',
        },
        {
          header: t('table.src'),
          fieldName: 'selfMaintenanceType',
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
      ] as ColumnProps[],
    [t]
  )

  const tableData = (data?.data?.content ?? [])
    .slice()
    .reverse()
    .map((item: any, index: number) => {
      const times = data?.data?.page * data?.data?.size + index + 1
      return {
        ...item,
        times: `${t('table.times')} ${times}`,
        severityManagement: item?.severityManagement?.name,
        selfMaintenanceType: convertIncidentSource(item?.selfMaintenanceType),
        incidentLocation: item?.incidentLocation?.name,
        recorder: item?.recorder?.name,
        recordingTime: convertToTime(item?.recordingTime),
      }
    })

  return [
    {
      methodForm,
      columns,
      tableData,
      data: data?.data,
      isLoading,
    },
    { t, onChangePageSize },
  ] as const
}
