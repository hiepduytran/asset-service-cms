import {
  GroupStandardConvert,
  MaintenanceShiftAuto,
} from '@/service/asset/maintenance/selfMaintenance/selfMaintenancePerform/detail/type'

export function mergeShifts(maintenanceShifts: MaintenanceShiftAuto[]) {
  const mergedShift = {
    shift: maintenanceShifts.map((item) => item?.shift),
    statusShift: maintenanceShifts.map((item) => item?.statusShift),
    confirmStatus: maintenanceShifts.map((item) => item?.confirmStatus),
    incidentRecording: maintenanceShifts.map((item) => item.incidentRecording),
    isShow: maintenanceShifts.map((item) => item?.isShow),
    groupStandard: [] as GroupStandardConvert[],
  }
  maintenanceShifts.forEach((shift, indexShift) => {
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

      group.items.forEach((item) => {
        let existingItem = existingGroup?.items.find(
          (i: any) => i.accessory.id === item.accessory.id
        )

        if (!existingItem) {
          existingItem = {
            accessory: item.accessory,
            result: item.result,
            role: item.role,
            isActive: item.isActive,
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
