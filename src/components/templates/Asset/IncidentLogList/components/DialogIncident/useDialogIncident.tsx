import { CoreButton } from '@/components/atoms/CoreButton'
import { FORMAT_DATE_TIME_API, useDate } from '@/components/hooks/date/useDate'
import { getUserIdToken } from '@/config/token'
import { useFormCustom } from '@/lib/form'
import { TRANSLATE } from '@/routes'
import {
  deleteDialogIncident,
  postDialogIncident,
  putDialogIncident,
} from '@/service/asset/IncidentLogList/dialog'
import { IncidentRecordingMaintenance } from '@/service/asset/IncidentLogList/dialog/type'
import { toastError, toastSuccess } from '@/toast'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
type Props = {
  hideDialogIncident: () => void
  type: string
  dataRow?: IncidentRecordingMaintenance
  refetchGetIncidentRecordingMaintenance?: any
  refetchIncidentRecordingMaintenanceIsUpdate?: any
  indexLine: number
  index2Line: number
  handleChangeRecordConditionTypeSave: (id?: number) => void
  recordConditionTypeStorageFn: (dataRow: IncidentRecordingMaintenance) => void
  dataLineId?: number
  departmentId: number | null
}
export default function useDialogIncident(props: Props) {
  const {
    type,
    dataRow,
    hideDialogIncident,
    refetchGetIncidentRecordingMaintenance,
    refetchIncidentRecordingMaintenanceIsUpdate,
    handleChangeRecordConditionTypeSave,
    recordConditionTypeStorageFn,
    dataLineId,
    departmentId,
  } = props
  const { t } = useTranslation(TRANSLATE.INCIDENT_LOG_LIST)
  const methods = useFormCustom<IncidentRecordingMaintenance>()
  const { handleSubmit, reset, setError } = methods
  const router = useRouter()
  const { actionType, id } = router.query
  const isView = actionType === 'VIEW'
  const isUpdate = !!id

  const userId = getUserIdToken()

  const { getDateNow } = useDate()

  const { mutate, isLoading } = useMutation(
    type === 'CREATE_NEW' ? postDialogIncident : putDialogIncident,
    {
      onSuccess: (res) => {
        toastSuccess(t('common:message.success'))
        hideDialogIncident()
        refetchGetIncidentRecordingMaintenance &&
          refetchGetIncidentRecordingMaintenance()
        handleChangeRecordConditionTypeSave(res.data?.id)
        if (type === 'REVIEW_AGAIN') {
          // recordConditionTypeStorageFn(res.data.id)
        }
      },
      onError: (error) => {
        toastError(error, setError)
      },
    }
  )

  const { mutate: mutateDeleteIncident } = useMutation(deleteDialogIncident, {
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

  const onSubmit = handleSubmit((data) => {
    if (type === 'CREATE_NEW') {
      mutate({
        ...data,
        selfMaintenanceType: 'RECOVERY',
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
        departmentId: departmentId,
        asset: {
          id: dataLineId ?? 0,
          name: '',
          code: '',
        },
        isFinalReview: true,
      })
    } else if (type === 'EDIT_NEW') {
      mutate({
        ...data,
        recorder: {
          id: userId,
          code: '',
          name: '',
        },
        selfMaintenanceType: 'RECOVERY',
        recordingStatus: 'EDIT_NEW',
        actionType: 'EDIT_NEW',
        numberOfReviewType: `Review_${
          dataRow?.selfMaintenanceType === 'RECOVERY'
            ? 1
            : Number(dataRow?.severityLevels?.length) + 1
        }`,
        departmentId: departmentId,
        approveStatus: 'PENDING',
        asset: {
          id: dataLineId ?? 0,
          name: '',
          code: '',
        },
        isFinalReview: true,
      })
    } else {
      recordConditionTypeStorageFn(dataRow ?? ({} as any))
      mutate({
        ...data,
        recorder: {
          id: userId,
          code: '',
          name: '',
        },
        selfMaintenanceType: 'RECOVERY',
        recordingStatus: 'REVIEW_AGAIN',
        actionType: 'REVIEW_EDIT',
        numberOfReviewType: `Review_${
          dataRow?.selfMaintenanceType === 'RECOVERY'
            ? dataRow?.severityLevels?.length
            : Number(dataRow?.severityLevels?.length) + 1
        }`,
        departmentId: departmentId,
        approveStatus: 'PENDING',
        asset: {
          id: dataLineId ?? 0,
          name: '',
          code: '',
        },
        isFinalReview: true,
      })
    }
  })

  const deleteIncident = () => {
    mutateDeleteIncident({ id: dataRow?.id ?? 0 })
  }

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
          {t('Ghi nhận sự cố')}
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
          <CoreButton theme='reject' onClick={deleteIncident}>
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
        ...dataRow,
        severityManagement:
          dataRow?.severityLevels[dataRow?.severityLevels.length - 1]
            ?.severityManagement,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return [
    { methods, isView },
    { t, getTitleDialog, getTextButton, onSubmit },
  ] as const
}
