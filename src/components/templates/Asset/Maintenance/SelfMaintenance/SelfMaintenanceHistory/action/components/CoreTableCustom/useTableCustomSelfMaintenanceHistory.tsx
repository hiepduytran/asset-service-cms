import { TRANSLATE } from '@/routes'
import { ShutdownInformation } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { MaintenanceHistoryConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail/type'
import { useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function useTableCustomSelfMaintenanceHistory() {
  const { t } = useTranslation(TRANSLATE.MAINTENANCE)
  const methods = useFormContext<MaintenanceHistoryConvert>()
  const { control } = methods

  const [isShowDialogDetailError, setIsShowDialogDetailError] = useState(false)
  const [incidentRecordingId, setIncidentRecordingId] = useState<number>(0)

  const [isShowDialog, setIsShowDialog] = useState(false)

  const [isShowDialogPauseMachine, setIsShowDialogPauseMachine] =
    useState(false)

  const [isViewPropMaintenanceAssessment, setIsViewPropMaintenanceAssessment] =
    useState<boolean>()

  const [isApproveAll, setIsApproveAll] = useState<boolean>()
  const [infoRecorderAndStatus, setInfoRecorderAndStatus] = useState<{
    name: string
    status: string
  }>()
  const [maintenanceShiftId, setMaintenanceShiftId] = useState<number>(0)
  const [roleId, setRoleId] = useState<number>()
  const [shutdownInformation, setShutdownInformation] =
    useState<ShutdownInformation>()

  const [isShowTooltip, setIsShowTooltip] = useState<{
    [id: string]: boolean
  }>({
    0: false,
  })

  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  const handleMouseEnter = (id: number) => {
    setHoveredCell(id) // Lưu lại ID của ô đang được hover
  }

  const handleMouseLeave = () => {
    setHoveredCell(null) // Xóa trạng thái hover khi rời chuột
  }

  const hideDialogPauseMachine = () => {
    setIsShowDialogPauseMachine(false)
  }

  const { fields: maintenanceShiftsFields } = useFieldArray({
    name: 'maintenanceShifts',
    control,
    keyName: 'key',
  })

  return [
    {
      methods,
      maintenanceShiftsFields,
      isShowDialogDetailError,
      incidentRecordingId,
      isShowTooltip,
      isShowDialog,
      isShowDialogPauseMachine,
      isViewPropMaintenanceAssessment,
      isApproveAll,
      infoRecorderAndStatus,
      maintenanceShiftId,
      roleId,
      shutdownInformation,
      hoveredCell,
    },
    {
      t,
      setIsShowDialogDetailError,
      setIncidentRecordingId,
      setIsShowTooltip,
      setIsShowDialog,
      setIsShowDialogPauseMachine,
      setIsViewPropMaintenanceAssessment,
      setIsApproveAll,
      setMaintenanceShiftId,
      setRoleId,
      setShutdownInformation,
      hideDialogPauseMachine,
      setInfoRecorderAndStatus,
      handleMouseEnter,
      handleMouseLeave,
    },
  ] as const
}
