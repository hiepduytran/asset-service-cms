import { TRANSLATE } from '@/routes'
import { putAuditMaintenanceApprove } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/action'
import { useAuditFinalSequence } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail'
import { AuditMaintenanceConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import {
  deleteDialogIncidentIdsAuto,
  deleteSequenceAuto,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/action'
import { toastError, toastSuccess } from '@/toast'
import { useEffect, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
type Props = {
  refetchAuditMaintenances?: any
  maintenanceShiftId: number
  maintenanceScheduleId: number
  hideDialog: () => void
  isRenderReview?: boolean
  handleChangeRenderReview?: () => void
  isApproveAll?: boolean
  isViewProp?: boolean
  isUpdateProp?: boolean
  roleId?: number
  ratingId: number
}
export default function useMaintenanceAssessment(props: Props) {
  const {
    refetchAuditMaintenances,
    maintenanceShiftId,
    maintenanceScheduleId,
    hideDialog,
    isRenderReview,
    handleChangeRenderReview,
    isApproveAll,
    isViewProp,
    isUpdateProp,
    roleId,
    ratingId,
  } = props

  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<AuditMaintenanceConvert>()
  const { getValues, reset, control, setValue, setError } = methods
  const [isShowDialogError, setIsShowDialogError] = useState(false)
  const [sequenceId, setSequenceId] = useState(0)
  const [isShowDialogListIncident, setIsShowDialogListIncident] =
    useState(false)

  const { mutate } = useMutation(deleteDialogIncidentIdsAuto, {
    onSuccess: (res) => {
      toastSuccess(t('common:message.success'))
      refetchAuditFinalSequence()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const {
    mutate: mutateDeleteSequenceAuto,
    isLoading: isLoadingDeleteSequenceAuto,
  } = useMutation(deleteSequenceAuto, {
    onSuccess: (res) => {
      toastSuccess(t('common:message.success'))
      hideDialog()
      refetchAuditMaintenances()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const {
    mutate: mutateAuditMaintenanceApprove,
    isLoading: isLoadingAutoMaintenanceApprove,
  } = useMutation(putAuditMaintenanceApprove, {
    onSuccess: () => {
      toastSuccess(t('common:message.success'))
      hideDialog()
      setValue('confirmList', [])
      refetchAuditFinalSequence()
    },
    onError: (error) => {
      toastError(error, setError)
    },
  })

  const {
    data: dataAuditFinalSequence,
    isLoading: isLoadingAuditFinalSequence,
    refetch: refetchAuditFinalSequence,
  } = useAuditFinalSequence(
    {
      maintenanceShiftId: maintenanceShiftId,
      maintenanceScheduleId: maintenanceScheduleId,
      // isOrigin: isApproveAll,
      roleIdOfConfirm: roleId,
    },
    {
      enabled: isViewProp || isUpdateProp || isRenderReview,
    }
  )

  const { fields: auditFinalSequenceFields } = useFieldArray({
    control,
    name: 'auditFinalSequence',
    keyName: 'key',
  })

  const handleSave = () => {
    setValue(
      'confirmList',
      (getValues('auditFinalSequence') ?? []).flatMap((item) =>
        item.items.flatMap((item2) =>
          item2.sequenceList
            .filter((item3) => item3.isConfirm)
            .map((item4) => ({
              groupStandardId: item.group.id,
              sequenceId: item4.sequence,
              isConfirm: item4.isConfirm,
              isHasError: item4.isHasError,
              reasonError: item4.reasonError,
              errorType: item4.errorType,
              userUpdate: item4.userUpdate,
            }))
        )
      )
    )
    handleChangeRenderReview && handleChangeRenderReview()
    hideDialog()
  }

  const onCancel = () => {
    setValue('auditFinalSequence', getValues('confirmListBack'))
    if ((getValues('recordConditionTypeSave') ?? []).length > 0) {
      mutate({
        ids: (getValues('recordConditionTypeSave') ?? []).map((item) => item),
      })
    }
    hideDialog()
  }

  const onEdit = () => {
    const { id, currentShift } = getValues()
    mutateAuditMaintenanceApprove({
      maintenanceScheduleId: id,
      maintenanceShiftId: currentShift.id,
      confirmList: (getValues('auditFinalSequence') ?? []).flatMap((item) =>
        item.items.flatMap((item2) =>
          item2.sequenceList.map((item4) => ({
            groupStandardId: item.group.id,
            sequenceId: item4.sequence,
            isConfirm: item4.isConfirm,
            isHasError: item4.isHasError,
            reasonError: item4.reasonError,
            errorType: item4.errorType,
            userUpdate: item4.userUpdate,
          }))
        )
      ),
    })
  }

  const onDelete = () => {
    mutateDeleteSequenceAuto({
      ratingId: ratingId,
    })
  }

  useEffect(() => {
    if (dataAuditFinalSequence) {
      if (isViewProp || isUpdateProp) {
        reset({
          ...getValues(),
          auditFinalSequence: dataAuditFinalSequence?.data,
        })
      } else if (isRenderReview) {
        reset({
          ...getValues(),
          auditFinalSequence: dataAuditFinalSequence?.data,
          // auditFinalSequence: dataAuditFinalSequence?.data.map(
          //   (item, index) => {
          //     return {
          //       ...item,
          //       items: item.items.map((item2, index2) => {
          //         return {
          //           ...item2,
          //           sequenceList: item2.sequenceList.map((item3, index3) => {
          //             return {
          //               ...item3,
          //               isConfirm: getValues(
          //                 `auditFinalSequence.${index}.items.${index2}.sequenceList.${index3}.isConfirm`
          //               ),
          //             }
          //           }),
          //         }
          //       }),
          //     }
          //   }
          // ),
        })
        setValue('confirmListBack', dataAuditFinalSequence?.data)
      } else {
        reset({
          ...getValues(),
        })
        setValue('confirmListBack', getValues('auditFinalSequence'))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataAuditFinalSequence])

  const convertStatusShift = (name: string) => {
    if (name === 'PAUSED') {
      return `${t('self_maintenance.self_maintenance_perform.text.normal')}`
    }
    return 'Hoạt động ổn định'
  }

  return [
    {
      methods,
      isLoadingAuditFinalSequence,
      auditFinalSequenceFields: auditFinalSequenceFields ?? [],
      isShowDialogError,
      sequenceId,
      isShowDialogListIncident,
      isLoadingAutoMaintenanceApprove,
      isLoadingDeleteSequenceAuto,
    },
    {
      t,
      handleSave,
      setIsShowDialogError,
      setSequenceId,
      setIsShowDialogListIncident,
      convertStatusShift,
      onCancel,
      onEdit,
      onDelete,
      refetchAuditFinalSequence,
    },
  ] as const
}
