export type IncidentRecordingMaintenance = {
  id: number
  code: string
  name: string
  reason: string
  severityManagement: {
    id: number
    name: string
    code: string
  }
  selfMaintenanceType: string
  incidentLocation: {
    id: number
    name: string
    code: string
  } | null
  recorder: {
    id: number
    name: string
    code: string
  }
  recordingTime: string
  actionType: string
  recordingStatus: string
  numberOfReviewType: string
  departmentId: number | null
  severityLevels: {
    severityManagement: {
      id: number
      name: string
      code: string
    }
    numberOfReviewType: string
  }[]

  asset?: {
    id: number
    code: string
    name: string
  }
  isFinalReview: boolean
  approveStatus: string
}
