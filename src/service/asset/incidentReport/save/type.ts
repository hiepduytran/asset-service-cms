export type IncidentReportSave = {
  code: string
  name: string
  product?: {
    id: number
    name: string
    code: string
    sku: string
  } | null
  asset: {
    id: number
    name: string
    code: string
    sku: string
  } | null
  assetName?: string
  recorder: {
    id: number
    name: string
    code: string
  } | null
  department: {
    id: number
    name: string
    code: string
  } | null
  recordingTime: string
  incidentRecodingIds: number[]
  status: string
  approve: string
  note: string
  incidentRecording: string
  statusAsset: string
  statusPlan: string
  statusHandle: string
  statusAfterHandle: string
}
export type RequestBody = {
  POST: IncidentReportSave
}
