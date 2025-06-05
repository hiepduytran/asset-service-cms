import { useDialog } from '@/components/hooks/dialog/useDialog'
import { TRANSLATE } from '@/routes'
import { putAuditMaintenanceApprove } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/action'
import {
  AuditMaintenanceConvert,
  ShutdownInformation,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { toastError, toastSuccess } from '@/toast'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

type Props = {
  refetchAuditMaintenances: any
}
export default function useTableCustom(props: Props) {
  const { refetchAuditMaintenances } = props
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<AuditMaintenanceConvert>()
  const { control, getValues, setError, trigger, setValue, watch } = methods
  const { showDialog } = useDialog()

  const [isShowDialog, setIsShowDialog] = useState(false)
  const [isShowDialogErrorAssessmentView, setIsShowDialogErrorAssessmentView] =
    useState(false)
  const [sequenceId, setSequenceId] = useState<number>(0)
  const [isShowDialogPauseMachine, setIsShowDialogPauseMachine] =
    useState(false)
  const [isShowDialogDetailError, setIsShowDialogDetailError] = useState(false)
  const [incidentRecordingId, setIncidentRecordingId] = useState<number>(0)

  const [isViewPropMaintenanceAssessment, setIsViewPropMaintenanceAssessment] =
    useState<boolean>()
  const [isUpdateMaintenanceAssessment, setIsUpdateMaintenanceAssessment] =
    useState<boolean>()
  const [isApproveAll, setIsApproveAll] = useState<boolean>()
  const [infoRecorderAndStatus, setInfoRecorderAndStatus] = useState<{
    name: string
    status: string
  }>()
  const [maintenanceShiftId, setMaintenanceShiftId] = useState<number>(0)
  const [roleId, setRoleId] = useState<number>()
  const [ratingId, setRatingId] = useState<number>(NaN)
  const [shutdownInformation, setShutdownInformation] =
    useState<ShutdownInformation>()

  const [severityManagement, setSeverityManagement] = useState()

  const [isShowDialogListIncident, setIsShowDialogListIncident] =
    useState(false)

  const getDateNowUTC = (inputDate: string) => {
    const date = new Date(inputDate)
    return date.toISOString()
  }

  const compareTimes = (time1: string, time2: string) => {
    const date1 = new Date(time1)
    const date2 = new Date(time2)

    if (!time1 || !time2) return true

    if (date1.getTime() <= date2.getTime()) return true
    return false
  }

  const hideDialogPauseMachine = () => {
    setIsShowDialogPauseMachine(false)
  }

  const compareHourAndMinute = (time1: string | null, time2: string) => {
    const [hour1, minute1] = (time1 ?? '').split(' ')[1].split(':').map(Number)
    const [hour2, minute2] = time2.split(':').map(Number)
    if (hour1 < hour2 || (hour1 === hour2 && minute1 < minute2)) {
      return true
    }
  }

  // state dùng để xem có render lại popup đánh giá lại không
  const [isRenderReview, setIsRenderReview] = useState(true)

  const { fields: maintenanceShiftAuditsFields } = useFieldArray({
    control,
    name: 'maintenanceShiftAudits',
    keyName: 'key',
  })

  const {
    mutate: mutateAuditMaintenanceApprove,
    isLoading: isLoadingAutoMaintenanceApprove,
  } = useMutation(putAuditMaintenanceApprove, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      refetchAuditMaintenances()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const convertStatusShift = (name: string) => {
    if (name) {
      return `${t('Dừng máy')}`
    } else {
      return `${t('Hoạt động ổn định')}`
    }
  }

  const handleApprove = () => {
    const {
      id,
      currentShift,
      severityManagement,
      confirmList,
      isShowIndex,
      currentRole,
    } = getValues()

    if (
      severityManagement ||
      (getValues('auditFinalSequence') ?? []).length > 0
    ) {
      mutateAuditMaintenanceApprove({
        maintenanceScheduleId: id,
        maintenanceShiftId: currentShift.id,
        severityManagement,
        confirmList: confirmList ?? [],
      })

      setIsRenderReview(true)
    } else {
      trigger('severityManagement')
    }
  }

  const handleChangeRenderReview = () => {
    setIsRenderReview(false)
  }

  return [
    {
      methods,
      maintenanceShiftAuditsFields,
      isLoadingAutoMaintenanceApprove,
      isShowDialog,
      isShowDialogErrorAssessmentView,
      sequenceId,
      isRenderReview,
      isShowDialogPauseMachine,
      isShowDialogDetailError,
      incidentRecordingId,
      isViewPropMaintenanceAssessment,
      isUpdateMaintenanceAssessment,
      infoRecorderAndStatus,
      isApproveAll,
      maintenanceShiftId,
      roleId,
      ratingId,
      shutdownInformation,
      severityManagement,
      isShowDialogListIncident,
    },
    {
      t,
      showDialog,
      convertStatusShift,
      handleApprove,
      setIsShowDialog,
      setIsShowDialogErrorAssessmentView,
      setSequenceId,
      handleChangeRenderReview,
      hideDialogPauseMachine,
      setIsShowDialogPauseMachine,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsViewPropMaintenanceAssessment,
      setIsUpdateMaintenanceAssessment,
      setInfoRecorderAndStatus,
      setIsApproveAll,
      setMaintenanceShiftId,
      setRoleId,
      setRatingId,
      setShutdownInformation,
      setIsRenderReview,
      compareHourAndMinute,
      getDateNowUTC,
      compareTimes,
      setSeverityManagement,
      setIsShowDialogListIncident,
    },
  ] as const
}
