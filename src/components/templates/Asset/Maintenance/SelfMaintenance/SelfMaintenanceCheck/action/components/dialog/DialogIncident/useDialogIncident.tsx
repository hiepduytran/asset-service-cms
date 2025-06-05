import { CoreButton } from '@/components/atoms/CoreButton'
import { FORMAT_DATE_TIME_API, useDate } from '@/components/hooks/date/useDate'
import { getUserIdToken } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'

import {
  deleteDialogIncidentAuto,
  postDialogIncidentAuto,
  putDialogIncidentAuto,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/action'
import { useQueryGetMaintenanceScheduleIncidentAllocation } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog'
import { IncidentRecordingMaintenanceAuto } from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/dialog/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
type Props = {
  hideDialogIncident: () => void
  type: string
  dataLineIncident?: IncidentRecordingMaintenanceAuto
  productId: number
  refetchGetIncidentRecordingMaintenance?: any
  handleChangeRecordConditionTypeSave: (id?: number) => void
  recordConditionTypeStorageFn: (data: IncidentRecordingMaintenanceAuto) => void
  maintenanceScheduleShiftId: number
  maintenanceScheduleId: number
}
export default function useDialogIncident(props: Props) {
  const {
    type,
    dataLineIncident,
    productId,
    hideDialogIncident,
    refetchGetIncidentRecordingMaintenance,
    handleChangeRecordConditionTypeSave,
    recordConditionTypeStorageFn,
    maintenanceScheduleShiftId,
    maintenanceScheduleId,
  } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const methods = useFormCustom<IncidentRecordingMaintenanceAuto>()
  const { handleSubmit, reset, setError } = methods
  const router = useRouter()
  const { actionType, id } = router.query
  const isView = actionType === 'VIEW'

  const userId = getUserIdToken()

  const { getDateNow } = useDate()

  const { mutate: mutateDeleteIncident, isLoading: isLoadingDeleteIncident } =
    useMutation(deleteDialogIncidentAuto, {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        hideDialogIncident()
        refetchGetIncidentRecordingMaintenance &&
          refetchGetIncidentRecordingMaintenance()
        handleChangeRecordConditionTypeSave()
      },
      onError: (error) => {
        toastError(error, setError)
      },
    })

  const { mutate, isLoading } = useMutation(
    type === 'CREATE_NEW' ? postDialogIncidentAuto : putDialogIncidentAuto,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        hideDialogIncident()
        refetchGetIncidentRecordingMaintenance &&
          refetchGetIncidentRecordingMaintenance()
        handleChangeRecordConditionTypeSave(res.data?.id)
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const onSubmit = handleSubmit((data) => {
    if (type === 'CREATE_NEW') {
      mutate({
        ...data,
        selfMaintenanceType: 'SELF_MAINTENANCE',
        recorder: {
          id: userId,
          code: '',
          name: '',
        },
        recordingTime: getDateNow(FORMAT_DATE_TIME_API),
        recordingStatus: 'CREATE_NEW',
        actionType: 'EDIT_NEW',
        numberOfReviewType: 'Review_1',
        approveStatus: 'PENDING',
        asset: {
          id: productId,
          name: '',
          code: '',
        },

        isFinalReview: true,
        maintenanceScheduleShiftId: maintenanceScheduleShiftId,
      })
    } else if (type === 'EDIT_NEW') {
      mutate({
        ...data,
        recorder: {
          id: userId,
          code: '',
          name: '',
        },
        selfMaintenanceType: 'SELF_MAINTENANCE',
        recordingStatus: 'EDIT_NEW',
        actionType: 'EDIT_NEW',
        numberOfReviewType: `Review_${
          dataLineIncident && dataLineIncident?.severityLevels?.length
        }`,
        approveStatus: 'PENDING',
        asset: {
          id: productId,
          name: '',
          code: '',
        },
        isFinalReview: true,
        maintenanceScheduleShiftId: maintenanceScheduleShiftId,
      })
    } else {
      recordConditionTypeStorageFn(dataLineIncident ?? ({} as any))
      mutate({
        ...data,
        recorder: {
          id: userId,
          code: '',
          name: '',
        },
        selfMaintenanceType: 'SELF_MAINTENANCE',
        recordingStatus: 'REVIEW_AGAIN',
        actionType: 'REVIEW_EDIT',
        numberOfReviewType: `Review_${
          dataLineIncident &&
          (dataLineIncident.selfMaintenanceType === 'SELF_MAINTENANCE'
            ? dataLineIncident?.severityLevels?.length
            : dataLineIncident?.severityLevels?.length + 1)
        }`,
        approveStatus: 'PENDING',
        asset: {
          id: productId,
          name: '',
          code: '',
        },
        isFinalReview: true,
        maintenanceScheduleShiftId: maintenanceScheduleShiftId,
      })
    }
  })

  const deleteIncident = () => {
    mutateDeleteIncident({ id: dataLineIncident?.id ?? 0 })
  }

  const {
    data: dataGetMaintenanceScheduleIncidentAllocation,
    isLoading: isLoadingGetMaintenanceScheduleIncidentAllocation,
  } = useQueryGetMaintenanceScheduleIncidentAllocation(
    {
      maintenanceScheduleId: maintenanceScheduleId,
    },
    { enabled: !(type === 'REVIEW_AGAIN' || type === 'REVIEW_EDIT') }
  )

  const getTitleDialog = (type: string): string => {
    if (type === 'CREATE_NEW') return t('Ghi nhận sự cố mới')
    if (type === 'REVIEW_AGAIN') return t('Đánh giá lại sự cố')
    if (type === 'EDIT_NEW') return t('Chỉnh sửa ghi nhận sự cố')
    if (type === 'REVIEW_EDIT') return t('Chỉnh sửa đánh giá lại')
    if (type === 'DETAIL') return t('Chi tiết ghi nhận sự cố')
    return ''
  }

  const getTextButton = (type: string): React.ReactNode => {
    if (type === 'CREATE_NEW')
      return (
        <CoreButton theme='submit' onClick={onSubmit} loading={isLoading}>
          {t('common:btn.add')}
        </CoreButton>
      )
    if (type === 'REVIEW_AGAIN')
      return (
        <CoreButton
          theme='submit'
          type='submit'
          onClick={onSubmit}
          loading={isLoading}
        >
          {t('Đánh giá lại')}
        </CoreButton>
      )
    if (type === 'EDIT_NEW' || type === 'REVIEW_EDIT')
      return (
        <>
          <CoreButton
            theme='reject'
            onClick={deleteIncident}
            loading={isLoadingDeleteIncident}
          >
            {t('common:btn.delete')}
          </CoreButton>
          <CoreButton
            theme='submit'
            type='submit'
            onClick={onSubmit}
            loading={isLoading}
          >
            {t('common:btn.save_change')}
          </CoreButton>
        </>
      )
    return <></>
  }

  useEffect(() => {
    if (type !== 'CREATE_NEW') {
      reset({
        ...dataLineIncident,
        reason: '',
        severityManagement:
          dataLineIncident?.severityLevels[
            dataLineIncident?.severityLevels.length - 1
          ]?.severityManagement,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return [
    {
      methods,
      isView,
      dataGetMaintenanceScheduleIncidentAllocation:
        dataGetMaintenanceScheduleIncidentAllocation
          ? dataGetMaintenanceScheduleIncidentAllocation.data
          : [],
      isLoadingGetMaintenanceScheduleIncidentAllocation,
    },
    { t, getTitleDialog, getTextButton },
  ] as const
}
