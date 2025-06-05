import { useDate } from '@/components/hooks/date/useDate'
import { ColumnProps } from '@/components/organism/CoreTable'
import { getUserIdToken } from '@/config/token'
import {
  changeActionType,
  changeApproveStatus,
  changeSelfMaintenanceType,
} from '@/enum'
import { useFormCustom } from '@/lib/form'
import { MENU_URL, TRANSLATE } from '@/routes'
import {
  incidentApprove,
  useQueryGetDetailIncidentApprove,
} from '@/service/asset/IncidentApprove/action'
import { DetailIncidentApprove } from '@/service/asset/IncidentApprove/action/type'
import { toastError, toastSuccess } from '@/toast'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export default function useIncidentApproveAction() {
  const { t } = useTranslation(TRANSLATE.INCIDENT_APPROVE)
  const methods = useFormCustom<DetailIncidentApprove>()
  const { reset, setError, handleSubmit, control, setValue, getValues } =
    methods
  const router = useRouter()
  const { id, actionType } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const [isShowDialogDeleteIncident, setIsShowDialogDeleteIncident] =
    useState(false)

  const userId = getUserIdToken()

  const { convertToTime } = useDate()

  const { fields: incidentRecordingMaintenancesFields } = useFieldArray({
    control,
    name: 'incidentRecordingMaintenances',
    keyName: 'key',
  })

  const {
    data: dataDetailIncidentApprove,
    isLoading: isLoadingDetailIncidentApprove,
    refetch: refetchDetailIncidentApprove,
  } = useQueryGetDetailIncidentApprove({
    id: Number(id),
  })

  const { mutate: mutateApprove, isLoading: isLoadingApprove } = useMutation(
    incidentApprove,
    {
      onSuccess: () => {
        toastSuccess(t('common:message.success'))
        router.push(MENU_URL.INCIDENT_APPROVE)
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  useEffect(() => {
    if (dataDetailIncidentApprove) {
      reset({
        ...dataDetailIncidentApprove.data,
        incidentRecordingMaintenances:
          dataDetailIncidentApprove.data.incidentRecordingMaintenances,
      })

      setValue(
        'incidentRecordingMaintenancesLast',
        dataDetailIncidentApprove.data.incidentRecordingMaintenances[
          dataDetailIncidentApprove.data.incidentRecordingMaintenances.length -
            1
        ]
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailIncidentApprove])

  const columns = useMemo(() => {
    return [
      {
        header: 'Lần',
        fieldName: 'turn',
      },
      {
        header: 'Lý do',
        fieldName: 'reason',
      },
      {
        header: 'Mức độ nghiêm trọng',
        fieldName: 'severityManagement.name',
      },
      {
        header: 'Loại ghi nhận',
        fieldName: 'actionType',
      },
      {
        header: 'Nguồn',
        fieldName: 'selfMaintenanceType',
      },
      {
        header: 'Vị trí sự cố',
        fieldName: 'incidentLocation.name',
      },
      {
        header: 'Người ghi nhận',
        fieldName: 'recorder.name',
      },
      {
        header: 'Thời gian ghi nhận',
        fieldName: 'recordingTime',
      },
      {
        header: 'Trạng thái ',
        fieldName: 'status',
      },
      {
        header: 'Người phê duyệt',
        fieldName: 'recorder.name',
      },
    ] as ColumnProps[]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const tableData = incidentRecordingMaintenancesFields
    .filter((_, index) => {
      return index !== incidentRecordingMaintenancesFields.length - 1
    })
    .map((item, index) => {
      return {
        ...item,
        turn: index + 1,
        actionType: (
          <Typography>{changeActionType(item.actionType, t)}</Typography>
        ),
        selfMaintenanceType: changeSelfMaintenanceType(
          item.selfMaintenanceType,
          t
        ),
        recordingTime: convertToTime(item.recordingTime),
        status: changeApproveStatus(item.approveStatus, t),
      }
    })

  const onReject = () => {
    setIsShowDialogDeleteIncident(true)
  }

  const hideDialogDeleteIncident = () => {
    setIsShowDialogDeleteIncident(false)
  }
  const onSubmit = handleSubmit(() => {
    mutateApprove({
      id: Number(id),
      status: 'APPROVED',
      reason: getValues(
        `incidentRecordingMaintenances.${
          getValues('incidentRecordingMaintenances')?.length - 1
        }.reason`
      ),
      personApprove: {
        id: userId,
        name: '',
        code: '',
      },
    })
  })
  return [
    {
      id,
      methods,
      isView,
      isUpdate,
      isLoadingDetailIncidentApprove,
      incidentRecordingMaintenancesFields,
      isLoadingApprove,
      isShowDialogDeleteIncident,
      tableData,
      columns,
    },
    {
      t,
      onReject,
      onSubmit,
      setIsShowDialogDeleteIncident,
      hideDialogDeleteIncident,
      refetchDetailIncidentApprove,
    },
  ] as const
}
