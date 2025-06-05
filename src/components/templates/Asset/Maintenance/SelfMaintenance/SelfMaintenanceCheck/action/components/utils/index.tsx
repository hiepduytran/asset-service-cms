import { MaintenanceShiftAudit } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceCheck/detail/type'
import { GroupStandardConvert } from '@/service/asset/maintenance/selfMaintenance/selfMaintenanceHistory/detail/type'

export const mergeShifts = (maintenanceShifts: MaintenanceShiftAudit[]) => {
  const mergedShift = {
    shift: maintenanceShifts.map((item) => item.shift),
    isApproveConfirm: maintenanceShifts.map((item) => item.isApproveConfirm),
    isShow: maintenanceShifts.map((item) => item.isShow),
    incidentRecording: maintenanceShifts.map((item) => item?.incidentRecording),
    statusShift: maintenanceShifts.map((item) => item.statusShift),
    confirmStatus: maintenanceShifts.map((item) => item?.confirmStatus),
    auditStaff: null,
    auditStatus: null,
    groupStandard: [] as GroupStandardConvert[],
  }

  maintenanceShifts.forEach((shift) => {
    shift?.groupStandard?.forEach((group) => {
      let existingGroup = mergedShift.groupStandard.find(
        (gs) => gs.group.id === group.group.id
      )
      if (!existingGroup) {
        existingGroup = {
          group: group.group,
          items: [],
        }
        mergedShift.groupStandard.push(existingGroup)
      }

      group.items?.forEach((item) => {
        let existingItem = existingGroup?.items.find(
          (i) => i.accessory.id === item.accessory.id
        )

        if (!existingItem) {
          existingItem = {
            accessory: item.accessory,
            role: item.role,
            result: item.result,
            isActive: item.isActive,
            incidentRecording: item.incidentRecording,
            sequenceList: [],
          }
          existingGroup?.items.push(existingItem)
        }

        existingItem.sequenceList.push({
          sequenceListItem: item.sequenceList,
          incidentRecording: item.incidentRecording,
        })
      })
    })
  })
  return [mergedShift]
}
