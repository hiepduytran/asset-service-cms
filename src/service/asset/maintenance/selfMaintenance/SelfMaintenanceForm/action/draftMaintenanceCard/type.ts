
export interface MaintenanceCard {
    id: number
    name: string
    code: string
    product: Product
    standardApplicableLine: StandardApplicableLine[]
    applicableDayOfWeeks: string[]
    state: string
    startDate: string
    maintenanceCardLines: MaintenanceCardLine[]
}
  
export interface Product {
    id: number
    sku: string
    name: string
    imageUrls: string[]
}
  
export interface StandardApplicableLine {
    id: number
    name: string
}
  
export interface MaintenanceCardLine {
    standardGroup: StandardGroup
    standardMaintenanceLines: StandardMaintenanceLine[]
}
  
export interface StandardGroup {
    id: number
    name: string
    code: string
}
  
export interface StandardMaintenanceLine {
    groupStaff: GroupStaff
    auditGroupStaffFirst: AuditGroupStaffFirst
    auditGroupStaffSecond: AuditGroupStaffSecond
    shifts: Shift[]
    frequency: number
    frequencyType: string
    note: string
}
  
export interface GroupStaff {
    id: number
    name: string
    code: string
}
  
export interface AuditGroupStaffFirst {
    id: number
    name: string
    code: string
}
  
export interface AuditGroupStaffSecond {
    id: number
    name: string
    code: string
}
  
export interface Shift {
    id: number
    name: string
    code: string
}
  

export type RequestBody = {
    POST: MaintenanceCard
}
